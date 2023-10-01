import React from "react";

function ProductCard({product}) {
    return (
        <div>
            <img src="" alt="" />
            <div>
                <h2>{product.name}</h2>
                <p>Price:- { product.price }</p>
            </div>
            <div>
                <button>More</button>
                <button>Order</button>
            </div>
        </div>
    )
};

export default ProductCard;