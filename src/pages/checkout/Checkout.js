import React, { useEffect } from 'react';
import UpdateUserInfosForm from '../../components/user/UpdateUserInfosForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/billing/OrderSummary';
import useTitle from '../../helpers/useTitle';

export default function Checkout() {
    const { user, token, isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();

    //set page title
    useTitle('Checkout');

    useEffect(() => {
        if(!isLoggedIn) navigate('/login');
    },[isLoggedIn, navigate])

    const renderUserInfos = () => (
        user && <UpdateUserInfosForm user={user} token={token} updating={false} />
    )

    return (
        <div className='container'>
            <div className="row my-5 pb-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-white border-0">
                            <h4 className="mt-3">
                                Billing Infos
                            </h4>
                            <hr />
                        </div>
                        <div className="card-body">
                            { renderUserInfos() }
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-white border-0">
                            <h4 className="mt-3">
                                Order Summary
                            </h4>
                            <hr />
                        </div>
                        <div className="card-body">
                            <OrderSummary token={token} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
