import React, { useState, useEffect } from 'react';
import AppwriteService from '../appwrite/appWriteConfig';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!userData?.$id) {
                setLoading(false); // Avoid infinite loading
                return;
            }

            try {
                const res = await AppwriteService.getAllPosts([
                    Query.equal("userId", userData.$id)
                ]);

                if (res?.documents) {
                    setPosts(res.documents);
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userData]);

    return (
        <div className="w-full py-8 min-h-screen bg-[#9EC6F3]">
            <Container>
                {loading ? (
                    <p className="text-center text-[#2C3E50] font-medium">Loading...</p>
                ) : posts.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold text-[#2C3E50]">No posts made yet.</h2>
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default AllPosts;
