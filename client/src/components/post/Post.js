import React from 'react';
import './Post.css';

const Post = ({ img }) => {
    return (
        <div className="post">
            <img className="postImg" src={img} alt="" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
                </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
                This is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
        </div>
    )
}

export default Post
