import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { BASE_URL, getConfig } from '../../helpers/config';

export default function Stripe() {
    const stripePromise = loadStripe('pk_test_51NMW6pA3qJxql3cpTiGpWk0rPyLz7efqHCcluAPnmCTFit8A6ZlGBfG2b8xHRLQn0Q19BDnYLD8lCjx5dBfeV2kQ00dGw3kaHz');
    const[clientSecret, setClientSecret] = useState('');
    const { token } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        fetchClientSecret();
    }, [])

    const fetchClientSecret = async() => {
        try {
            const response = await axios.post(`${BASE_URL}/order/pay`,
            { cartItems }, getConfig(token));
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                stripePromise && clientSecret && <Elements stripe={stripePromise}
                    options={{clientSecret}}>
                    <CheckoutForm />
                </Elements>
            }
        </>
    )
}
