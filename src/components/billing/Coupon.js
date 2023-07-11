import React from 'react'

export default function Coupon({coupon, setCoupon, applyCoupon}) {
    return (
        <div className='row mb-3'>
            <div className="col-md-12">
                <div className='d-flex'>
                    <input type='text' 
                        value={coupon.name}
                        onChange={(e) => setCoupon({...coupon, name: e.target.value})}
                        className='form-control rounded-0'
                        placeholder='Enter a promo code' 
                    />
                    <button 
                        disabled={!coupon.name}
                        onClick={() => applyCoupon()}
                        className='btn btn-primary rounded-0'>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}
