import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './TopBar.css';

const TopBar = () => {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

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
                    <li className="topBarListItem">
                        <Link to="/">HOME</Link>
                    </li>
                    <li className="topBarListItem">ABOUT</li>
                    <li className="topBarListItem">CONTACT</li>
                    <li className="topBarListItem">
                        <Link to="/write">WRITE</Link>
                    </li>
                    <li className="topBarListItem" onClick={handleLogout}>
                        { user && "LOGOUT" }
                    </li>
                </ul>
            </div>
            <div className="topBarRight">
                {
                    user ? (
                        <img 
                            src={user.profilePic}
                            alt="" 
                            className="topBarImg"
                        />
                    ) : (
                        <>
                            <Link to="/login" className="topBarListItem">LOGIN</Link>
                            <Link to="/register" className="topBarListItem">REGISTER</Link>
                        </>
                    )
                }
                <i className="topBarSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}

export default TopBar;
