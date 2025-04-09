import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "./index";
import appwriteService from "../appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm();
    useEffect(() => {
        if (post) {
          reset({
            title: post.title || "",
            slug: post.slug || post.$id || "",
            content: post.content || "",
            status: post.status || "active",
          });
        }
      }, [post, reset]);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const generatedSlug = slugTransform(value.title);
                const currentSlug = getValues("slug");
    
                // Only update slug if user hasn’t manually changed it
                if (generatedSlug !== currentSlug) {
                    setValue("slug", generatedSlug, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        });
    
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, getValues]);
    

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                        featuredImage: file.$id,
                    });

                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    // Optional: guard clause for edit mode with missing slug
    const watchedSlug = watch("slug");

    if (post && (!watchedSlug || typeof watchedSlug !== "string" || watchedSlug.trim() === "")) {
        return (
        <div className="text-red-600 font-semibold text-center py-6">
            Invalid or missing slug for post. Please check the data.
        </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
