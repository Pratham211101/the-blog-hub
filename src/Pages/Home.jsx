import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/appWriteConfig";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const [checkingUser, setCheckingUser] = useState(true); // new state to track auth check

    useEffect(() => {
        // Delay until we know whether userData is set or not
        if (userData !== undefined) {
            setCheckingUser(false); // now we know whether user is logged in
            if (userData) {
                appwriteService
                    .getAllPosts()
                    .then((posts) => {
                        if (posts) {
                            setPosts(posts.documents);
                        }
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }
    }, [userData]);

    if (loading || checkingUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#9EC6F3]">
                <PacmanLoader color="#9EC6F3" size={25} />
                <p className="mt-4 text-[#2C3E50] text-lg font-medium">
                    Loading...
                </p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="w-full py-16 bg-[#9EC6F3] text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-[#2C3E50]">
                        Login to read posts
                    </h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 bg-[#9EC6F3] text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-[#2C3E50]">
                        No active posts
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-10 bg-[#9EC6F3] min-h-screen">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
