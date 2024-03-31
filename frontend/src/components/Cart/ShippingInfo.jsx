import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux"
import style from "./ShippingInfo.module.css"
import { useNavigate } from 'react-router-dom';
import { checkoutSuccess, placeOrder } from "../../store/cart";

function ShippingInfo() {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const isSubmitting = useSelector(state => state.cart.isSubmitting);
    const isSubmitSuccess = useSelector(state => state.cart.isSubmitSuccess);
   
    const dispatch = useDispatch();
    console.log(isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Submitting:- ", isSubmitting);
        console.log("Submitted:- ", isSubmitSuccess);
        if (isSubmitSuccess) {
            dispatch(checkoutSuccess());
            console.log("Order Placed Successfully !!!!!!");
        }
    }, [isSubmitting, isSubmitSuccess, dispatch]);

    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);

    function handleSubmit() {
        const shippingInfo = {
            address,
            city,
            phoneNumber,
            postalCode,
            state,
            country
        }
        console.log(shippingInfo)

        if (isLoggedIn) {
            dispatch(placeOrder(shippingInfo));
            dispatch(checkoutSuccess())
            navigate("/profile");
        } else {
            navigate("/login");
        }

    }
    return (
        <>
            <Navbar></Navbar>
            <div className={style.loginForm}>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        className={style.input}
                        placeholder="Address"
                        defaultValue={address}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        className={style.input}
                        placeholder="City"
                        defaultValue={city}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={style.input}
                        placeholder="PhoneNumber"
                        defaultValue={phoneNumber}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={style.input}
                        placeholder="PostalCode"
                        defaultValue={postalCode}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        className={style.input}
                        placeholder="State"
                        defaultValue={state}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        className={style.input}
                        placeholder="Country"
                        defaultValue={country}
                    />
                </label>
                <button
                    onClick={handleSubmit}
                    className={style.btn}
                >
                    Submit
                </button>
                { isSubmitting && <div>Placing Order......</div> }
                
            </div>
        </>
    );
};

export default ShippingInfo;