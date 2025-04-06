import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/appWriteConfig";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
import { PacmanLoader } from "react-spinners";


function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);


    useEffect(() => {
        appwriteService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false));
    }, [userData])
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <PacmanLoader color="#00008B" size={25} />
                <p className="mt-4 text-white text-lg font-medium">Loading...</p>
            </div>
        );
    }
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    if (posts.length === 0 ) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold ">
                                No active posts 
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home