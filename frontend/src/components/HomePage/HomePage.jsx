import React from "react";
import Navbar from "../Navbar/Navbar";
import style from "./HomePage.module.css";

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
            <section className={style.intro}>
                <div className={style.name}> 
                    <h1>Welcome To Annapurna</h1>
                </div>
                <div className={style.images}>
                    
                </div>
            </section>
            
        </>
    )
};

export default HomePage;