import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Coupon from './Coupon';
import { BASE_URL, getConfig } from '../../helpers/config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setCartItemDiscount } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export default function OrderSummary({token}) {
    const { cartItems } = useSelector(state => state.cart);
    const { validInfos } = useSelector(state => state.user);
    const [coupon, setCoupon] = useState({
        name: ''
    });
    const [validCoupon, setValidCoupon] = useState({
        name: '',
        discount: 0
    });
    const dispatch = useDispatch();

    //calculate the total amount of the cart
    const amount = cartItems.reduce((acc, item) => acc += item.price * item.quantity, 0);

    //calculate the discount
    const calcDiscount = () => {
        return validCoupon.discount > 0 ? amount * validCoupon.discount / 100 : 0;
    }

    //calculate the final total
    const calcTotal = () => {
        return amount - calcDiscount();
    }


    useEffect(() => {
        fetchCoupon();
    }, []);

    const fetchCoupon = () => {
        const selectedCoupon = JSON.parse(localStorage.getItem('coupon')) || '';
        setValidCoupon(selectedCoupon);
    }

    const applyCoupon = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/apply/coupon`, 
                coupon, getConfig(token));
            if(response.data.success) {
                const selectedCoupon = response.data.coupon;
                localStorage.setItem('coupon', JSON.stringify(selectedCoupon));
                dispatch(setCartItemDiscount(selectedCoupon.id));
                setValidCoupon(selectedCoupon);
                setCoupon({...coupon, name: ''});
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else {
                setCoupon({...coupon, name: ''});
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeCoupon = () => {
        localStorage.removeItem('coupon');
        setValidCoupon({
            name: '',
            discount: 0
        });
        toast.error('Coupon removed', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <>
            <Coupon 
                coupon={coupon} 
                setCoupon={setCoupon}
                applyCoupon={applyCoupon}
            />
            <ul className='list-group'>
                {
                    cartItems.map((item, index) => (
                        <li key={index} className="list-group-item d-flex">
                            <img src={item.image} 
                                alt={item.name} 
                                className='img-fluid rounded me-2'
                                width={60}
                                height={60}
                            />
                            <div className="d-flex flex-column">
                                <h5 className="my-1">
                                    <strong>{item.name}</strong>
                                </h5>
                                <span className="text-muted">
                                    <i>Color: {item.color}</i>
                                </span>
                                <span className="text-muted">
                                    <i>Size: {item.size ? item.size.toUpperCase() : 'N/A'}</i>
                                </span>
                            </div>
                            <div className="d-flex flex-column ms-auto">
                                <span className="text-muted">
                                    {item.price} <i>x</i> {item.quantity}
                                </span>
                                <span className="text-danger fw-bold">
                                    ${item.price * item.quantity}
                                </span>
                            </div>
                        </li>
                    ))
                }
                <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">
                        Discount ({validCoupon.discount}%)
                    </span>
                    <span className="fw-normal text-danger">
                        {validCoupon.name} <i 
                            style={{cursor: 'pointer'}}
                            onClick={() => removeCoupon()}
                            className={`bi bi-trash ${!validCoupon.name ? 'd-none' : ''}`}></i>
                    </span>
                    <span className="fw-bold text-danger">
                        -${calcDiscount()}
                    </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">
                        Total
                    </span>
                    <span className="fw-bold">
                        ${calcTotal()}
                    </span>
                </li>
            </ul>
            <div className='my-3'>
                {
                    validInfos ? 
                        <Link to='/order/pay' 
                            className='btn btn-primary w-100'>
                                Proceed to payment
                        </Link>
                    :
                        <Link to='/profile' 
                            className='btn btn-primary w-100'>
                                Update your infos
                        </Link>
                }
            </div>
        </>
    )
}
