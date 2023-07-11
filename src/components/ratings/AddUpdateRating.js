import React from 'react';
import { Rating } from 'react-simple-star-rating';
import Spinner from '../spinner/Spinner';
import { useSelector } from 'react-redux';

export default function AddUpdateRating({review, updating, loading, updateReview, clearReview, setReview, handleRating, addReview}) {
    const { reviewed } = useSelector(state => state.product);

    return (
        <div className="row my-3">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white text-center">
                        <h4 className='mt-2'>
                            {updating ? 'Edit' : 'Add'} your review
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => updating ? updateReview(e) : addReview(e)}>
                            <div className="mb-3">
                                <input type="text" 
                                    onChange={(e) => setReview({
                                        ...review, title: e.target.value
                                    })}
                                    value={review.title}
                                    className="form-control"
                                    required
                                    maxLength={255}
                                    placeholder='Title*' />
                            </div>
                            <div className="mb-3">
                                <textarea rows="5" cols="30" 
                                    onChange={(e) => setReview({
                                        ...review, body: e.target.value
                                    })}
                                    value={review.body}
                                    required
                                    className="form-control"
                                    placeholder='Review*'></textarea>
                            </div>
                            <div className="my-2">
                                <Rating initialValue={review.rating}
                                    onClick={handleRating}
                                    size={32} />
                            </div>
                            <div className="mb-2">
                                {
                                    loading ? <Spinner />
                                    :
                                    updating ?
                                        <>
                                            <button className="btn btn-sm btn-warning"
                                                type='submit'>
                                                Update
                                            </button>
                                            <button className="btn btn-sm btn-danger mx-2"
                                                onClick={() => clearReview()}>
                                                Cancel
                                            </button>
                                        </>
                                    :
                                        <button className="btn btn-sm btn-primary"
                                            disabled={!review.title || !review.body || review.rating === 0 || reviewed}>
                                            Submit
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
