import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/category")
            setCats(res.data.cats);
        }
        getCats();
    }, []);

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
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sideBarListItem">{c.name}</li>   
                        </Link>
                    ))}
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
