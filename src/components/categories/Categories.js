import React from 'react'

export default function Categories({categories, handleSCategoryChange}) {
  return (
    <ol className='list-group list-group-numbered'>
        {
            categories?.map(category => (
                <li key={category.id} className='list-group-item d-flex justify-content-between align-items-start'>
                    <div className="ms-2 me-auto">
                        <div>
                            <a href="#"
                                onClick={() => handleSCategoryChange({param: 'category', slug: category.slug})}
                                style={{cursor: 'pointer'}}
                                className='text-decoration-none text-dark fw-bold'>
                                {category.name_en}
                            </a>
                        </div>
                        {
                             category?.subcategories?.map(subcategory => (
                                <a key={subcategory.id} href="#" 
                                    onClick={() => handleSCategoryChange({param: 'subcategory', slug: subcategory.slug})}
                                    style={{cursor: 'pointer'}}
                                    className='btn btn-link text-decoration-none text-muted'>
                                    <i>{subcategory.name_en}</i>
                                </a>
                             ))
                        }
                    </div>
                    <span className="badge bg-dark rounded-pill">
                        {category.products.length}
                    </span>
                </li>
            ))
        }
    </ol>
  )
}
