import React from 'react';
import RatingListItem from './RatingListItem';

export default function RatingList({product, user, editReview, deleteReview}) {
  return (
    <ul className='list-group'>
        {
            product.reviews.map(review => (
                <RatingListItem
                    key={review.id}
                    review={review}
                    user={user}
                    editReview={editReview}
                    deleteReview={deleteReview}
                />
            ))
        }
    </ul>
  )
}
