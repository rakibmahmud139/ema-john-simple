import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    // Use Context
    const { signIn } = useContext(AuthContext);

    // Private Route
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';



    // Sign In
    const handleSignIn = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        form.reset();
        setError('');

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="" required />
                    <p onClick={() => setShow(!show)}><small>
                        {
                            show ? <span>Hide Password</span> : <span>Show Password</span>
                        }
                    </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Ema John? <Link to='/signUp'>Create New Account</Link></small></p>
            <p className='text-error'><small>{error}</small></p>
        </div>
    );
};

export default Login;