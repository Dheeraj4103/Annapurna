import React from "react";
import styles from "./ProductCard.module.css";
import ReduxAddToCart from "../ReduxAddToCart/ReduxAddToCart";



function ProductCard({product}) {
    return (
        <div className={styles.product}>
            <img src={product.photos[0].secure_url} alt="" />
            <div className={styles.info}>
                <h2>{product.name}</h2>
                <p>Price:- { product.price }</p>
            </div>
            <div className={styles.btns}>
                {/* <button className={styles.btn}>More</button>
                <button className={styles.btn}>Order</button> */}
                <ReduxAddToCart product={product} className={styles.btn}></ReduxAddToCart>
            </div>
        </div>
    )
};

export default ProductCard;