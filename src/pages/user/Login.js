import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helpers/config';
import Spinner from '../../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInOut, setCurrentUser, setToken } from '../../redux/slices/userSlice';
import useTitle from '../../helpers/useTitle';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn }  = useSelector(state => state.user);
    const dispatch = useDispatch();

    //set page title
    useTitle('Login');

    useEffect(() => {
        if(isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/user/login`,
            user);
            setLoading(false);
            if(response.data.success) {
                dispatch(setLoggedInOut(true));
                dispatch(setCurrentUser(response.data.user));
                dispatch(setToken(response.data.token));
                sessionStorage.setItem('currentToken', JSON.stringify(response.data.token));
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/');
            }else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            setLoading(false);
            setErrors(error.response.data.errors);
        }
    }

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-white my-2 rounded p-1 bg-danger">
                { error }
            </div>
        ))
    )

    return (
        <div className='container'>
            <div className="row my-5 mb-5">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="text-cenret mt-2">
                                Login
                            </h5>
                        </div>
                        <div className="card-body">
                            <form className='mt-5' onSubmit={(e) => loginUser(e)}>
                                <div className="mb-3">
                                    <label htmlFor="email" 
                                        className='form-label'>Email*</label>
                                    <input type="email" id="email" 
                                        onChange={(e) => setUser({
                                            ...user, email: e.target.value
                                        })}
                                        className="form-control" />
                                        { renderErrors('email') }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" 
                                        className='form-label'>Password*</label>
                                    <input type="password" id="password" 
                                        onChange={(e) => setUser({
                                            ...user, password: e.target.value
                                        })}
                                        className="form-control" />
                                        { renderErrors('password') }
                                </div>
                                <div className="mb-3">
                                    {
                                        loading ? 
                                            <Spinner />
                                        : 
                                        <button type="submit" 
                                            className='btn btn-primary'>
                                                Submit
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
