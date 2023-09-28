import React from "react";
import style from "./Navbar.module.css";

function Navbar() {
    return (
        <div className={style.navbar}>
            <div className={ style.logo }>
                <img src="https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917484/Annapurna/assets/atvvqhjvrqhs1sms8phz.png"></img>
            </div>
            <ul>
                <li className={style.tabs}>
                    Home
                </li>
                <li>
                    Menu
                </li>
                <li>
                    About
                </li>
            </ul>
            <div className={style.search}>
                <input type="text" placeholder="Search Food"/> 
            </div>
        </div>
    )
};

export default Navbar;