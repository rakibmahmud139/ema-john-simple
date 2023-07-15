// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';





const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];

        // step 1 : get id 
        for (const id in storedCart) {

            // step 2 : get the product by using id
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {

                // step 3 : get quantity fo the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // step 4 : add the addedProduct to the saveCart
                saveCart.push(addedProduct);
            }
        }

        // step 5 : set the cart
        setCart(saveCart);

    }, [products])


    const handlerAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];

        const exists = cart.find(pd => pd.id === product.id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }


        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
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
            <div>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order
                            <FontAwesomeIcon className='delete-icon' icon={faArrowRight}
                            />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;