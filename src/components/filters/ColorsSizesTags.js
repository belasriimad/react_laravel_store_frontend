import React, { useState } from 'react'

export default function ColorsSizesTags({product, handleChoosenColor, handleChoosenSize, choosenColorAndSize}) {
  return (
    <>
      <div className="my-3 d-flex align-items-center flex-wrap">
        <span className="fw-bold mx-2">
          Choose a color: 
        </span>
        {
          product.color_en.split(',').map((color, index) => (
            <div key={index}>
              <input type="radio" className="form-check-input mx-1"
                value={color}
                style={{backgroundColor: color}}
                id={color}
                name='color'
                checked={choosenColorAndSize.choosenColor === color}
                onChange={(e) => handleChoosenColor(e)}
              />
              <label htmlFor={color}>
                {color}
              </label>
            </div>
          ))
        }
      </div>
      {
        product?.size_en && <div className="my-3 d-flex align-items-center flex-wrap">
          <span className="fw-bold mx-2">
            Choose a size: 
          </span>
          {
            product.size_en.split(',').map((size, index) => (
              <div key={index}>
                <input type="radio" className="form-check-input mx-1"
                  value={size}
                  id={size}
                  name='size'
                  checked={choosenColorAndSize.choosenSize === size}
                  onChange={(e) => handleChoosenSize(e)}
                />
                <label htmlFor={size}>
                  {size.toUpperCase()}
                </label>
              </div>
            ))
          }
        </div>
      }
      {
        product?.tag_en && <div className="my-3 d-flex align-items-center flex-wrap">
          <span className="fw-bold mx-2">
            Tags: 
          </span>
          {
            product.tag_en.split(',').map((tag, index) => (
              <div key={index}>
                <span className='badge bg-secondary p-2 mx-1'>
                  {tag}
                </span>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}
