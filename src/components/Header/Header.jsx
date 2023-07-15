// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => { })
            .catch(error => console.error(error))
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user ?
                        user && <span className='user'>{user.email} <button onClick={handleLogOut}>Log out</button></span>
                        :
                        <Link to="/login">Login</Link>
                }
                <Link to="/signUp">Sign Up</Link>

            </div>
        </nav>
    );
};

export default Header;