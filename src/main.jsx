import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop.jsx';
import Home from './components/Layout/Home.jsx';
import Orders from './components/Orders/Orders.jsx';
import Inventory from './components/Inventory/Inventory.jsx';
import Login from './components/Login/Login.jsx';
import cartProductsLoader from './Loaders/cartProductsLoader.js';
import Checkout from './components/Checkout/Checkout.jsx';
import SignUp from './SignUp/SignUp.jsx';
import AuthProvider from './components/Providers/AuthProvider.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Shop />
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory /></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ]

  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
