import React from 'react';
import SideBar from '../../components/sideBar/SideBar';
import SinglePost from '../../components/singlePost/SinglePost';
import './Single.css';

const Single = () => {
    return (
        <div className="single">
            <SinglePost />
            <SideBar />
        </div>
    )
}

export default Single
