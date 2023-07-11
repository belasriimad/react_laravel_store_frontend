import React from 'react';
import { useSelector } from 'react-redux';

export default function Error() {
    const { error } = useSelector(state => state.product);

    return (
        <>
            {
                error && <div className="row my-5">
                    <div className="col-md-6 mx-auto">
                        <div className="alert alert-danger">
                            { error }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
