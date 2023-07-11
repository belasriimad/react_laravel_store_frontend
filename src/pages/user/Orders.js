import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../helpers/useTitle';

export default function Orders() {
    const {user, token, isLoggedIn} = useSelector(state => state.user);
    const navigate = useNavigate();
    const[orderToShow, setOrderToShow] = useState(5);

    const checkOrderStatus = (status) => (
        status ? <span className="badge bg-success">
            {status}
        </span>
        : <i className="text-muted">
            Pending...
        </i>
    )

    //set page title
    useTitle('Orders');

    useEffect(() => {
        if(!isLoggedIn) navigate('/login');
    }, [isLoggedIn, navigate]);

    const loadMoreOrders = () => {
        if(orderToShow >= user?.orders?.length) {
            return;
        }else {
            setOrderToShow(prevOrdersToShow => prevOrdersToShow + 5);
        }
    }

    return (
        <div className='container'>
            <div className="row my-5 pb-5">
                {
                    !user ?
                        <Spinner />
                    :
                    <>
                        <ProfileSidebar user={user} token={token}/>
                        <div className="col-md-8">
                            <div class="card-body">
                                <table class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Ordered</th>
                                            <th>Picked</th>
                                            <th>Shipped</th>
                                            <th>Delivered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            user?.orders?.slice(0, orderToShow).map((order, index) => (
                                                <tr key={index}>
                                                    <td>{index+=1}</td>
                                                    <td>{order.product.name_en}</td>
                                                    <td>{order.product.selling_price}</td>
                                                    <td>{order.qty}</td>
                                                    <td>${order.total}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>
                                                        { checkOrderStatus(order.picked_date) }
                                                    </td>
                                                    <td>
                                                        { checkOrderStatus(order.shipped_date) }
                                                    </td>
                                                    <td>
                                                        { checkOrderStatus(order.delivered_date) }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center mt-4">
                                    {
                                        orderToShow < user?.orders?.length && 
                                        <button 
                                            onClick={() => loadMoreOrders()}
                                            className="btn btn-sm btn-primary">
                                            Load more
                                        </button>
                                    }
                                </div>
                                {
                                    !user?.orders?.length && 
                                    <div className="alert alert-info">
                                        No orders yet!
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    ) 
}
