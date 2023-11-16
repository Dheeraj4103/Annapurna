import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./MenuPage.module.css";
import ProductList from "../ProductList/ProductList";

function MenuPage() {
    return (
        <>
            <Navbar></Navbar>
            <ProductList></ProductList>
        </>
    )
};

export default MenuPage;