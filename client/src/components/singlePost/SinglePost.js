import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./SinglePost.css";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/post/" + path);
            setPost(res.data.post);
        };
        getPost();
    }, [path]);

  return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.image && (
                    <img 
                        className="singlePostImg"
                        src={post.image}
                        alt=""
                    />
                )}
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            {post.username}
                        </b>
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