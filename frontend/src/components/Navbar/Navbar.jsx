import React from "react";
import style from "./Navbar.module.css";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className={style.navbar}>
            <div className={ style.logo }>
                <img src="https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917484/Annapurna/assets/atvvqhjvrqhs1sms8phz.png"></img>
            </div>
            <ul>
                <li>
                    <Link to="/" className={style.link}>Home</Link>
                </li>
                <li>
                    <Link to="/menu" className={style.link}>Menu</Link>
                </li>
                <li>
                    <Link to="/about" className={style.link}>About</Link>
                </li>
            </ul>
            <div className={style.search}>
                <input type="text" placeholder="Search Food" /> 

                <LocalMallIcon
                    variant="contained"
                    fontSize="large"
                    className={style.cart}
                >
                </LocalMallIcon>
                <AccountCircleIcon
                    variant="contained"
                    fontSize="large"
                    className={style.cart}
                >
                </AccountCircleIcon>
            </div>
        </div>
    )
};

export default Navbar;