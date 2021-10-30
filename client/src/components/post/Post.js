import React from 'react';
import './Post.css';

const Post = ({ post }) => {
    // const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.image && <img className="postImg" src={post.image} alt="" />}
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                    {post.title} 
                </span>
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
