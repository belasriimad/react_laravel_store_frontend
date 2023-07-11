import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helpers/config';
import Spinner from '../../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTitle from '../../helpers/useTitle';

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn }  = useSelector(state => state.user);

    //set page title
    useTitle('Register');

    useEffect(() => {
        if(isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);


    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/user/register`,
            user);
            setLoading(false);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/login');
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
                                Register
                            </h5>
                        </div>
                        <div className="card-body">
                            <form className='mt-5' onSubmit={(e) => registerUser(e)}>
                                <div className="mb-3">
                                    <label htmlFor="name" 
                                        className='form-label'>Name*</label>
                                    <input type="text" id="name" 
                                        onChange={(e) => setUser({
                                            ...user, name: e.target.value
                                        })}
                                        className="form-control" />
                                        { renderErrors('name') }
                                </div>
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
