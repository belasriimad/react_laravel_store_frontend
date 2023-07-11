import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

export default function ProductItem({product}) {
    const {lang} = useSelector(state => state.setting);

    return (
        <div className='col-md-6 mb-2'>
            <Link to={`/products/${product.slug}`} className='text-decoration-none'>
                <div className="card h-100">
                    <img src={product.thumbnail} alt={product.name_en}
                        className='card-img-top' height={200} />
                    <div className="card-body">
                        <div className="card-title text-dark">
                            {lang === 'en' ? product.name_en : product.name_fr}
                        </div>
                        <div className="d-flex justify-content-between my-2">
                            <span className="text-danger fw-bold">
                                ${product.selling_price}
                            </span>
                            <strike className="text-secondary fw-bold">
                                {product.old_price > 0 && `$${product.old_price}`} 
                            </strike>
                        </div>
                        <div className="d-flex justify-content-between my-2">
                            <span className="text-success fw-bold">
                                {lang === 'en' ? product.category.name_en : product.category.name_fr}
                            </span>
                            {
                                product.status ? (
                                    <span className="text-primary fw-bold">
                                        In Stock
                                    </span>
                                )
                                    :
                                (
                                    <span className="text-warning fw-bold">
                                        Out of Stock
                                    </span>
                                )
                            }
                        </div>
                        {
                            product.product_reviews_avg_rating > 0 && 
                                <Rating 
                                    initialValue={product.product_reviews_avg_rating}
                                    readonly
                                    size={24} 
                                />
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}
