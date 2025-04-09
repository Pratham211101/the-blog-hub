import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appWriteConfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post or image:", error);
        }
    };

    return post ? (
        <div className="py-10 px-10 bg-[#fcf4e4] min-h-screen">
            <Container>
                <div className="w-full max-w-4xl mx-auto bg-[#BDDDE4] rounded-2xl shadow-md overflow-hidden relative mb-6 transition-all duration-300">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-80 object-cover rounded-t-2xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="px-4 py-2 bg-[#3f37ab] text-[#dee7fa] rounded-full font-semibold hover:bg-[#9EC6F3] hover:text-white transition">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={deletePost}
                                className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-300 hover:text-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto mb-4">
                    <h1 className="text-3xl font-bold text-[#9FB3DF] mb-4">
                        {post.title}
                    </h1>
                    <div className="prose max-w-none text-gray-800">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
