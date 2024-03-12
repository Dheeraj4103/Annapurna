import React, { useMemo, memo } from "react";
import { useSelector } from "react-redux";
import ReduxAddToCart from "../ReduxAddToCart/ReduxAddToCart";


function Cart() {
    const cart = useSelector(state => state.cart.items);
    const cartList = Object.values(cart);

    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < cartList.length; i++) {
            total += (cartList[i].quantity * cartList[i].price)
        }
        return total;
    }

    const total = useMemo(getTotalPrice, [cart]);

    if (cartList.length === 0) {
        return <div>No Item in Cart</div>
    } else {
        return (
            <div>
                <ol>
                    {
                        cartList.map(cartItem => {
                            return (
                                <li key={cartItem.id} >
                                    <h3>{cartItem.name}</h3>
                                    <ReduxAddToCart product={cartItem}></ReduxAddToCart>
                                    <div>Total Price:- { cartItem.price * cartItem.quantity }</div>
                                </li>
                            )
                        })
                    }
                </ol>
                <h1>Total:- { total }</h1>
            </div>
        )
    }

}

export default memo(Cart);