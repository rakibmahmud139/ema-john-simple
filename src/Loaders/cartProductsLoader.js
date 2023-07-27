import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadProducts = await fetch('http://localhost:5000/products');
    const products = await loadProducts.json();

    // if cart data is in database , you have to use async await
    const storedCart = getShoppingCart();
    const saveCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);

        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }

    // if you need to send to two things
    // return [ products, savedCart]
    // another options
    // return { products, saveCart }

    return saveCart;
}


export default cartProductsLoader;