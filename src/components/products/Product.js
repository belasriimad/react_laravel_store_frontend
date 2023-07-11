import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/slices/productSlice';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import Spinner from '../../components/spinner/Spinner';
import ProductRating from './ProductRating';
import useTitle from '../../helpers/useTitle';
import PageNotFound from '../404/PageNotFound';

export default function Product() {
    const { product, loading} = useSelector(state => state.product);
    const { user, token} = useSelector(state => state.user);
    const { slug } = useParams();
    const disptach = useDispatch();

    //set page title
    useTitle(!loading ? product && product.name_en : '...');

    useEffect(() => {
        disptach(fetchProduct(slug));
    }, [slug, disptach, user])


    const renderProductDetails = () => (
        product ? <div className='container'>
            <div className='row my-5 pb-5'>
                    <div className="col-md-6">
                        <ProductImages product={product} />
                    </div>
                    <div className="col-md-6">
                        <ProductDetails product={product} />
                    </div>
                    <ProductRating product={product} data={{user, token}} />
                </div>
            </div>
        :
        <PageNotFound />
    )

    return (
        loading ? <Spinner />
        :   
        renderProductDetails()
    )
}
