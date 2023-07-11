import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toogleShowSearchBox } from '../../redux/slices/productSlice';
import axios from 'axios';
import { BASE_URL, getConfig } from '../../helpers/config';
import { checkIfUserDataIsValid, setCurrentUser, setLoggedInOut, setToken } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { setLang } from '../../redux/slices/settingSlice';

export default function Header() {
    const {cartItems} = useSelector(state => state.cart);
    const {isLoggedIn, user, token} = useSelector(state => state.user);
    const {lang} = useSelector(state => state.setting);
    const disptach = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(token) getLoggedInUser();
    }, [token])

    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user`, getConfig(token));
            disptach(setCurrentUser(response.data.user));
            disptach(checkIfUserDataIsValid());
        } catch (error) {
            if(error?.response?.status === 401) {
                sessionStorage.removeItem('currentToken');
                disptach(setLoggedInOut(false));
                disptach(setToken(''));
            }
        }
    }

    const logoutUser = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/user/logout`, null, getConfig(token));
            sessionStorage.removeItem('currentToken');
            disptach(setLoggedInOut(false));
            disptach(setCurrentUser(null));
            disptach(setToken(''));
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">React Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" 
                                to="/">
                                <i className="bi bi-house-door"></i>{" "}
                                {lang === 'en' ? 'Home' : 'Accueil'}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart">
                                <i className="bi bi-basket"></i> {lang === 'en' ? 'Cart' : 'Panier'} ({cartItems.length})
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button 
                                onClick={() => disptach(setLang('en'))}
                                className={`btn btn-link text-decoration-none 
                                    ${lang === 'en' ? 'text-white badge bg-danger' : 'text-white badge bg-secondary'}`}>
                                EN
                            </button>
                        </li>
                        |
                        <li className="nav-item">
                            <button 
                                onClick={() => disptach(setLang('fr'))}
                                className={`btn btn-link text-decoration-none 
                                    ${lang === 'fr' ? 'text-white badge bg-danger' : 'text-white badge bg-secondary'}`}>
                                FR
                            </button>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {
                            isLoggedIn ?
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} aria-current="page" 
                                        to="/profile">
                                        <i className="bi bi-person"></i> { user && user.name}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={() => logoutUser()}
                                        className='nav-link border-0 bg-light'>
                                        <i className="bi bi-person-fill-up"></i> {lang === 'en' ? 'Logout' : 'Déconnexion'}
                                    </button>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} aria-current="page" 
                                        to="/register">
                                        <i className="bi bi-person-add"></i> {lang === 'en' ? 'Register' : 'Inscription'}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">
                                        <i className="bi bi-person-fill-up"></i> {lang === 'en' ? 'Login' : 'Connexion'}
                                    </Link>
                                </li>
                            </>
                        }
                        {
                            location.pathname === '/' && <li className="nav-item">
                                <button 
                                    onClick={() => disptach(toogleShowSearchBox())}
                                    className="btn btn-link text-decoration-none text-dark">
                                    <i className="bi bi-search"></i>
                                </button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
