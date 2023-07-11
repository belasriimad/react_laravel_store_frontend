import React, { useState } from 'react';
import { Parser } from 'html-to-react';
import { Rating } from 'react-simple-star-rating';
import ColorsSizesTags from '../filters/ColorsSizesTags';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

export default function ProductDetails({product}) {
    const [choosenColor, setChoosenColor] = useState('');
    const [choosenSize, setChoosenSize] = useState('');
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const {lang} = useSelector(state => state.setting);

    const handleChoosenColor = (e) => {
        setChoosenColor(e.target.value);
    }

    const handleChoosenSize = (e) => {
        setChoosenSize(e.target.value);
    }

    const calculateReviewAverage = () => {
        let average = product.reviews.reduce((acc, review) => {
            return acc + review.rating / product.reviews.length;
        }, 0);
        return average > 0 ? average.toFixed(1) : 0; 
    }

    return (
        <div className='card'>
            <div className="card-header bg-white text-center">
                <h3 className="mt-2">
                    {lang === 'en' ? product.name_en : product.name_fr}
                </h3>
            </div>
            <div className="card-body">
                <div className="card-text">
                    { lang === 'en' ? Parser().parse(product.desc_en) : Parser().parse(product.desc_fr) }
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
                        calculateReviewAverage() > 0 && 
                            <div className='d-flex align-items-center'>
                                <Rating 
                                    initialValue={calculateReviewAverage()}
                                    readonly
                                    size={24} 
                                />
                                <span className="mx-1">
                                    ({ calculateReviewAverage() })
                                </span>
                            </div>
                    }
                    <hr />
                    <ColorsSizesTags product={product}
                        choosenColorAndSize={{choosenColor, choosenSize}}
                        handleChoosenColor={handleChoosenColor}
                        handleChoosenSize={handleChoosenSize} />
                    <div className="mb-4">
                        <input type="number" className="form-control" 
                            placeholder='Qty'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            min={1}
                            max={product.qty > 1 ? product.qty : 1}
                        />
                    </div>
                    <div className="flex-grow-1 mx-2">
                        <button className="btn btn-primary w-100" 
                            disabled={!product.status || !choosenColor || (product.size_en && !choosenSize)}
                            onClick={() => {
                                dispatch(addToCart({
                                    id: product.id,
                                    name: product.name_en,
                                    quantity: parseInt(qty),
                                    color: choosenColor,
                                    size: choosenSize,
                                    maxQty: parseInt(product.qty),
                                    price: parseInt(product.selling_price),
                                    image: product.thumbnail,
                                    coupon_id: null
                                }));
                                setChoosenColor('');
                                setChoosenSize('');
                                setQty(1);
                            }}>
                            <i className="bi bi-cart-plus-fill"></i> add to cart
                        </button>
                    </div>
                </div>
        </div>
    )
}
