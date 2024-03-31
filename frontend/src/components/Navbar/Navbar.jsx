import React from "react";
import { useDispatch, useSelector} from "react-redux"
import style from "./Navbar.module.css";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../../store/User";


function Navbar() {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
    }

    function handleProfile() {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                <img alt="" src="https://res.cloudinary.com/dxn2tkapb/image/upload/v1695917484/Annapurna/assets/atvvqhjvrqhs1sms8phz.png"></img>
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
                <Link to="/cart" className={style.link_1}>
                    <LocalMallIcon
                        variant="contained"
                        fontSize="large"
                        className={style.cart}
                    >
                    </LocalMallIcon>
                </Link>
                {/* Login button */}
                <div className={style.userName}>
                    <AccountCircleIcon
                        variant="contained"
                        fontSize="large"
                        className={style.cart}
                        onClick={ handleProfile }
                    >
                    </AccountCircleIcon>
                    {/* {isLoggedIn ? <>{userName}</> : <></>} */}
                    {isLoggedIn ?
                        <button onClick={handleLogout} className={style.logout}>Logout</button> :
                        <Link to="/login" className={style.link_1}>Login</Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;