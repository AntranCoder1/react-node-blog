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
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/post/" + path);
            setPost(res.data.post);
            setTitle(res.data.post.title);
            setDesc(res.data.post.desc);
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

    const handleUpdate = async () => {
        try {
            await axios.put(`/post/${post._id}`, { 
                username: user.username,
                title,
                desc
            });
            // window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            console.log(error)
        }
    }

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
                { updateMode ? ( <input 
                    type="text" 
                    value={title} 
                    className="singlePostTitleInput" 
                    autoFocus 
                    onChange={(e) => setTitle(e.target.value)}
                /> ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}
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
                {updateMode ? ( <textarea 
                    className="singlePostDescInput" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value) }
                /> ) : (
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
                { updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>UpdatePost</button>
                )}
            </div>
        </div>
    );
}