import React from 'react';
import ProductItem from './ProductItem';

export default function ProductList({products, fetchNextPrevProducts}) {

  const renderPaginationLinks = () => (
    <ul className='pagination'>
      {
        products?.links?.map((link, index) => (
          <li key={index} className={`page-item ${!link.url ? 'disabled' : ''}`}>
            <a href="#" style={{cursor: 'pointer'}} 
              onClick={() => fetchNextPrevProducts(link.url)}
              className={`page-link ${link.active ? 'active' : ''}`}>
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))
      }
    </ul>
  )

  return (
    <>
      <div className='row'>
          {
              products?.data?.map(product => <ProductItem key={product.id} 
                  product={product}/>)
          }
      </div>
      <div className="my-4 d-flex justify-content-between">
        <div className='text-muted'>
          Showing {products.from || 0} to {products.to || 0} from {products.total || 0} results. 
        </div>
        <div>
          {renderPaginationLinks()}
        </div>
      </div>
    </>
  )
}
