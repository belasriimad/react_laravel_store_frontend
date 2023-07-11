import { auto } from '@popperjs/core';
import React from 'react'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'

export default function RatingListItem({ review, user, editReview, deleteReview }) {
    const { reviewed } = useSelector(state => state.product);

    const renderReviewActions = () => (
        user && reviewed && review.user_id === user.id && 
            <div className="dropdown ms-auto">
                <i className="bi bi-three-dots-vertical"
                    data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                    <li>
                        <span className="dropdown-item" 
                            onClick={() => editReview(review)}
                            style={{cursor: 'pointer'}}>
                            <i className="bi bi-pen mx-2"></i> update
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item"
                            onClick={() => deleteReview(review)}
                            style={{cursor: 'pointer'}}>
                            <i className="bi bi-trash mx-2"></i> delete
                        </span>
                    </li>
                </ul>
            </div>
    )

    return (
        <li className='list-group-item bg-light d-flex justify-content-start 
            align-items-center'>
                <div className="me-2">
                    <img src={review.user.image_url}
                        className='rounded-circle'
                        alt="User image"
                        width={60} height={60} />
                </div>
                <div className="d-flex flex-column">
                    <h6>{ review.title } </h6>
                    <p className='m-0'>
                        <i>{ review.body }</i>
                    </p>
                    <Rating initialValue={review.rating}
                        readonly size={24} />
                    <span className="text-muted">
                        {review.created_at} by <span className="fw-bold">
                            {review.user.name}
                        </span>
                    </span>
                </div>
            {
                renderReviewActions()
            }
        </li>
    )
}
