import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./SinglePost.css";

export default function SinglePost() {
    const { user } = useContext(Context);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/post/" + path);
            setPost(res.data.post);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/post/${post._id}`, { data: { username: user.username }});
            window.location.replace('/');
        } catch (error) {
            console.log(error)
        }
    }

    console.log(post.username === user.username)

  return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.image && (
                    <img 
                        className="singlePostImg"
                        src={PF + post.image}
                        alt=""
                    />
                )}
                <h1 className="singlePostTitle">
                    {post.title}
                    {post.username === user?.username && (
                        <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit"></i>
                            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                    )}
                </h1>
                <div className="singlePostInfo">
                    <span>
                        Author: 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b className="singlePostAuthor">
                                {post.username}
                            </b>
                        </Link>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    );
}