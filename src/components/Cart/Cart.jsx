// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


// eslint-disable-next-line react/prop-types
const Cart = ({ cart, handleClearCart, children }) => {
    // const cart = props.cart; option: 1...
    // const {cart} = props;  //option: 2...


    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;

    for (const product of cart) {

        // if (product.quantity === 0) {
        //     product.quantity = 1;
        // } option 1
        // product.quantity = product.quantity || 1; option 2

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    const tax = totalPrice * 7 / 100;

    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price : ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax : ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>

            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;