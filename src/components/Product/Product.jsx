// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Product.css';

const Product = (props) => {

    // eslint-disable-next-line react/prop-types, no-unused-vars
    const { img, seller, name, ratings, price } = props.product;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>${price}</p>
                <p>Manufacturer : {seller}</p>
                <p>Rating : {ratings} Stars</p>
            </div>
            <button className='btn-cart'>Add to cart</button>
        </div>
    );
};

export default Product;