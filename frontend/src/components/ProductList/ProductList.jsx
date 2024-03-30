import React, { useEffect, memo } from "react";
import {useDispatch, useSelector} from "react-redux"
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";
import { loadingProducts } from "../../store/Products";

function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productList);
    console.log(products)

    useEffect(() => {
        dispatch(loadingProducts());
    }, [dispatch]);

    if (products.isLoading) {
        return <h1>Loading....</h1>
    } else if (products.products.length > 0) {

        return (
            <div className={styles.list}>
                {
                    products.products.map((product, index) => {
                        console.log(product)
                        product["id"] = index;
                            return (
                                <ProductCard product={product} key={index}/>
                            )
                        })
                    
                    
                }
            </div>
        );
    } else {
        return <h1>No products found....</h1>
    }
};

export default ProductList;