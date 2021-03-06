import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { useLocation } from 'react-router-dom';

const Post = ({ post }) => {
    const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.image && <img className="postImg" src={PF + post.image} alt="" />}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map(cat => (
                        <span className="postCat">{cat.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">
                        {post.title} 
                    </span>
                </Link>
                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    )
}

export default Post
