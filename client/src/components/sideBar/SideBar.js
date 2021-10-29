import React from 'react';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="sideBar">
            <div className="sideBarItem">
                <span className="sideBartitle">ABOUT ME</span>
                <img  
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
                </p>
            </div>
            <div className="sideBarItem">
                <span className="sideBartitle">CATEGORIES</span>
                <ul className="sideBarList">
                    <li className="sideBarListItem">life</li>
                    <li className="sideBarListItem">Music</li>
                    <li className="sideBarListItem">Style</li>
                    <li className="sideBarListItem">Sport</li>
                    <li className="sideBarListItem">Tech</li>
                    <li className="sideBarListItem">Cinema</li>
                </ul>
            </div>
            <div className="sideBarItem">
                <span className="sideBartitle">FOLLOW US</span>
                <div className="sideBarSocial">
                    <i className="sideBarIcon fab fa-facebook-square"></i>
                    <i className="sideBarIcon fab fa-twitter-square"></i>
                    <i className="sideBarIcon fab fa-pinterest-square"></i>
                    <i className="sideBarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar
