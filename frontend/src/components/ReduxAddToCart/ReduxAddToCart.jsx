import React, {memo} from "react";
import {useDispatch, useSelector} from "react-redux"
import { addtocart, removefromcart } from "../../store/cart";

function ReduxAddToCart({product, className}) {
    const dispatch = useDispatch();
    const quantity = useSelector(state => { return state.cart.items[product.id]?.quantity || 0 });

    function increment() {
        dispatch(addtocart(product));
    }

    function decrement() {
        dispatch(removefromcart(product));
    }

    if (quantity === 0) {
        return (
            <button className={className} onClick={increment}>Add to Cart</button>
        )
    } else {
        return (
            <div>
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
            </div>
        );
    }
}

export default memo(ReduxAddToCart);