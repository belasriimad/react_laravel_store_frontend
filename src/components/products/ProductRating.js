import React, { useEffect, useState } from 'react';
import RatingList from '../ratings/RatingList';
import AddUpdateRating from '../ratings/AddUpdateRating';
import axios from 'axios';
import { BASE_URL, getConfig } from '../../helpers/config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { checkIfProductAlreadyReviewedByUser, removeProductReview } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

export default function ProductRating({ product, data:{user, token} }) {
    const [review, setReview] = useState({
        product_id: product.id,
        user_id: user && user.id,
        title: '',
        body: '',
        rating: 0
    });
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            dispatch(checkIfProductAlreadyReviewedByUser({product, user}));
        }
    }, [product, user, dispatch, product.reviews])

    const handleRating = (rating) => {
        setReview({...review, rating});
    }

    const addReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/store/review`,
            review, getConfig(token));
            if(response.data.success) {
                setLoading(false);
                clearReview();
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else {
                setLoading(false);
                clearReview();
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const updateReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/update/review`,
            review, getConfig(token));
            if(response.data.success) {
                dispatch(removeProductReview(review));
                setLoading(false);
                clearReview();
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const deleteReview = async (review) => {
        try {
            const response = await axios.post(`${BASE_URL}/delete/review`,
            review, getConfig(token));
            if(response.data.success) {
                dispatch(removeProductReview(review));
                clearReview();
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editReview = (review) => {
        setReview(review);
        setUpdating(true);
    }

    const clearReview = () => {
        setReview({
            product_id: product.id,
            user_id: user && user.id,
            title: '',
            body: '',
            rating: 0
        });
        if(updating) {
            setUpdating(false);
        }
    }

    return (
        <div className='row my-4'>
            <div className="col-md-10 mx-auto">
                <div className="card">
                    <div className="card-header bg-white">
                        <h4 className="mt-2">
                            Reviews ({ product.reviews.length })
                        </h4>
                    </div>
                    <div className="card-body">
                        <RatingList 
                            product={product}
                            editReview={editReview}
                            deleteReview={deleteReview}
                            user={user} />
                        {
                            user ? 
                                <AddUpdateRating 
                                    review={review} 
                                    setReview={setReview}
                                    handleRating={handleRating}
                                    addReview={addReview}
                                    loading={loading}
                                    updating={updating}
                                    clearReview={clearReview}
                                    updateReview={updateReview}
                                />
                            :
                            <div className="alert alert-info mt-4">
                                Please <Link to="/login" className='alert-link'>
                                    login
                                </Link> to add your review
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
