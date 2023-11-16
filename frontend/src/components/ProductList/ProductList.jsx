import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

function ProductList() {
    // const response = await fetch("/api/v1/products");
    
    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    // }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/api/v1/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data.products);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    useEffect(() => {
        console.log("products array is changed", products);
    }, [products]);
    

    return (
        <div className={styles.list}>
            {
                (products.length > 0 ? (
                    products.map((product) => {
                        return (
                            <ProductCard product={product}/>
                        )
                    })
                ) : <></>
                )
            }
        </div>
    );
};

export default ProductList;