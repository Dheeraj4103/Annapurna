import React, { useMemo, memo } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import ReduxAddToCart from "../ReduxAddToCart/ReduxAddToCart";
import Navbar from "../Navbar/Navbar";
import style from "./Cart.module.css";



function Cart() {
    const cart = useSelector(state => state.cart.items);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const cartList = Object.values(cart);
    console.log(cartList);
    const navigate = useNavigate();

    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < cartList.length; i++) {
            total += (cartList[i].quantity * cartList[i].price)
        }
        return total;
    }

    const total = useMemo(getTotalPrice, [cartList]);

    function handleNext() {
        if (isLoggedIn) {
            navigate("/shippingInfo")
        } else {
            navigate("/login");
        }
    }

    if (cartList.length === 0) {
        return (
            <>
                <Navbar></Navbar>
                <div className={style.cart}>
                    <h1>No Items in Cart !!! </h1>
                </div>
                </>
        )
    } else {
        return (
            <>
                <Navbar></Navbar>
                <div className={style.cart}>
                    <h1>My Cart</h1>
                    <div className={ style.cartItems }>
                        <ol>
                            {
                                cartList.map(cartItem => {
                                    return (
                                        <li key={cartItem.id} >
                                            <h3>{cartItem.name}</h3>
                                            <ReduxAddToCart product={cartItem}></ReduxAddToCart>
                                            <div>Total Price:- {cartItem.price * cartItem.quantity}</div>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        <h1>Total:- {total}</h1>
                        <button className={ style.btn } onClick={handleNext}>Next</button>
                    </div>
                </div>
            </>
        );
    };

}

export default memo(Cart);