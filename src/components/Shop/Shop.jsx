// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';





const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { totalProducts } = useLoaderData();


    const totalPages = Math.ceil(totalProducts / itemsPerPage)


    // const pageNumbers = [];
    // for (let i = 1; i < 10; i++) {
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];


    /**
     * Done : 1.Determine the total number of items
     * TODO : 2. Decide on the number of items per page
     * Done : 3. Calculate the number of pages
     * Done : 4. Determine the current page
    */


    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json();
            setProducts(data);
        }
        fetchData()
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const saveCart = [];

                // step 1 : get id 
                for (const id in storedCart) {

                    // step 2 : get the product by using id
                    const addedProduct = cartProducts.find(product => product._id === id);
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
            })
    }, [])


    const handlerAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];

        const exists = cart.find(pd => pd._id === product._id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }


        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    const options = [5, 12, 15, 10, 20]

    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setItemsPerPage(0);
    }



    return (
        <>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
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

            {/* pagination */}

            <div className="pagination">
                <p>'currentPage': {currentPage}</p>

                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }

                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;