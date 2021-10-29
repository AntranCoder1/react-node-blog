import React from 'react';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="topBar">
            <div className="topBarLeft">
                <i className="topBarIcon fab fa-facebook-square"></i>
                <i className="topBarIcon fab fa-twitter-square"></i>
                <i className="topBarIcon fab fa-pinterest-square"></i>
                <i className="topBarIcon fab fa-instagram-square"></i>
            </div>
            <div className="topBarCenter">
                <ul className="topBarList">
                    <li className="topBarListItem">HOME</li>
                    <li className="topBarListItem">ABOUT</li>
                    <li className="topBarListItem">CONTACT</li>
                    <li className="topBarListItem">WRITE</li>
                    <li className="topBarListItem">LOGOUT</li>
                </ul>
            </div>
            <div className="topBarRight">
                <img 
                    src="https://pbs.twimg.com/media/EDE8TYTUYAAv9-R.jpg:large" 
                    alt="" 
                    className="topBarImg"
                />
                <i className="topBarSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}

export default TopBar;
