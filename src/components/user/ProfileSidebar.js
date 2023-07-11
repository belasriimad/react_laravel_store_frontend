import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL, getConfig } from '../../helpers/config';
import { setCurrentUser } from '../../redux/slices/userSlice';
import Spinner from '../spinner/Spinner';

export default function ProfileSidebar({ user, token }) {
    const[image, setImage] = useState('');
    const[loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const fileInput = useRef();
    const [errors, setErrors] = useState([]);

    const updateProfileImage = async () => {
        setErrors([]);
        setLoading(true);
        try {
            //set form data key: user_image value: selected image
            const formData = new FormData();
            formData.append('user_image', image);
            formData.append('_method', 'put');
            //send data to server
            const response = await axios.post(`${BASE_URL}/user/update/${user.id}`, 
                formData, getConfig(token, 'multipart/form-data'));
            //update user infos
            dispatch(setCurrentUser(response.data.user));
            setImage('');
            fileInput.current.value = '';
            setLoading(false);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            setLoading(false);
            setErrors(error.response.data.errors);
        }
    }

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-danger my-2">
                <i>{ error }</i>
            </div>
        ))
    )

    return (
        <div className='col-md-4'>
            <div className="card p-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={user.image_url} 
                        width={150}
                        height={150}
                        className='rounded-circle'
                        alt="Profile image" />
                    <div className="input-group my-3">
                        <input type="file"
                            ref={fileInput}
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control" />
                            { renderErrors('user_image') }
                        {
                            loading ?
                                <span className="text-danger fw-bold mx-1 mt-1" style={{fontSize: '16px'}}>
                                    uploading...
                                </span>
                            :
                            <button 
                                disabled={!image}
                                onClick={() => updateProfileImage()}
                                className="btn btn-sm btn-primary">
                                Upload
                            </button>
                        }
                    </div>
                    <ul className="list-group w-100 text-center">
                        <li className="list-group-item">
                            <i className="bi bi-person"></i> {user.name}
                        </li>
                        <li className="list-group-item">
                            <i className="bi bi-envelope-at-fill"></i> {user.email}
                        </li>
                        <li className="list-group-item">
                            <Link to="/user/orders" className='text-decoration-none text-dark'>
                                <i className="bi bi-bag-check-fill"></i> orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
