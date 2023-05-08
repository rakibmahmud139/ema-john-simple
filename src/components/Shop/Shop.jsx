// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handlerAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className='shop-container'>

            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handlerAddToCart={handlerAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <h4>Order summary</h4>
                <p>Selected Items: {cart.length}</p>
                <p>Total Price : ${}</p>
                <p>Total Shipping Charge: ${}</p>
                <p>Tax : ${}</p>
                <h5>Grand Total: ${}</h5>
            </div>
        </div>
    );
};

export default Shop;