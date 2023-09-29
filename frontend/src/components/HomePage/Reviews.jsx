import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import style from "./Reviews.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const reviews = [
    {
        name: "Dheeraj Jadhav",
        rating: 5,
        comment: "Paneer was Sooo Delicious"
    },
    {
        name: "Akash Mali",
        rating: 5,
        comment: "Delicious, Tasty, yummy, it was everything"
    },
    {
        name: "Gaurav Patil",
        rating: 4,
        comment: "One Paratha was enough"
    },
    {
        name: "Hanumant Dhaigude",
        rating: 5,
        comment: "Want to taste more"
    },
    {
        name: "Arjun Galgate",
        rating: 5,
        comment: "Heaven"
    },
]

const reviewsSlide = reviews.map((review) => {
    return (
        <div className={style.card}>
            <h3>{review.comment}</h3>
            {
                [...Array(review.rating)].map((_) => {
                    return (
                        <StarIcon></StarIcon>
                    )
                })
            }
            <p>~ {review.name}</p>
        </div>
    )
}
);
    
function Reviews() {
    const [currentIndex, setCurrentIndex] = useState();

    function handleChange(index) {
    setCurrentIndex(index);
    }
    
    return (
        <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={reviews[currentIndex]}
        onChange={handleChange}
        className={style.carouselContainer}
        >
            {reviewsSlide}
        </Carousel>
    )
};

export default Reviews;