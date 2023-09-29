import React from "react";
import Navbar from "../Navbar/Navbar";
import style from "./HomePage.module.css";
import Reviews from "./Reviews";

function HomePage() {
    return (
        <>
            <Navbar></Navbar>
            <section className={style.intro}>
                <div className={style.name}> 
                    <h1>Welcome To Annapurna</h1>
                </div>
                <div className={style.images}>
                    
                </div>
            </section>
            <section className={style.reviews}>
                <h1>Reviews</h1>
               <Reviews></Reviews>
            </section>
            
            
        </>
    )
};

export default HomePage;