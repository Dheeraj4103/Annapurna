import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";


function Profile() {
    const user = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    console.log(user)
    if (!user.isLoggedIn) {
        navigate("/login")
    }

    
    
    const myOrders = user.myOrders;


    return (
        <>
            <Navbar></Navbar>
            <div className={style.profile}>
                <h1>Profile</h1>
                <h1>{user.name}</h1>
                <h2>My Orders</h2>
                {myOrders.length === 0 ? <h3>No Orders Placed ...</h3> : 
                    <ol className={style.orderList}>
                        {
                            myOrders.map(order => {
                                return (
                                    <>
                                        <li key={order._id}>
                                            {
                                                order.orderItems.map(item => {
                                                    return (
                                                        <p>{item.name}</p>
                                                    )
                                                })
                                            }
                                            <h3>Total:- {order.totalAmount}</h3>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ol>
                }
            </div>
        </>
    );
}

export default Profile;