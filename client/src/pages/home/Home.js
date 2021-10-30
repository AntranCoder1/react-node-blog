import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sideBar/SideBar';
import axios from 'axios';
import './Home.css';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/post")
            setPosts(res.data.posts);
        }
        fetchPosts();
    }, []);
    
    console.log(posts);

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    )
}

export default Home;
