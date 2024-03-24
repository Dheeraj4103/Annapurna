import React, {memo} from "react";
import {useDispatch, useSelector} from "react-redux"
import { addtocart, removefromcart } from "../../store/cart";
import style from "./ReduxAddToCart.module.css"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
            <div className={ style.addRemoveCart }>
                {/* <button onClick={decrement} className={style.btn}>-</button> */}
                <RemoveCircleIcon
                    onClick={decrement}
                    className={style.btn}
                    fontSize="large"
                ></RemoveCircleIcon>
                <p>{quantity}</p>
                {/* <button onClick={increment}>+</button> */}
                <AddCircleIcon
                    onClick={increment}
                    className={style.btn}
                    fontSize="large"
                ></AddCircleIcon>
            </div>
        );
    }
}

export default memo(ReduxAddToCart);