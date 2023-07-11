import React, { useState } from 'react';

export default function SearchBox({handleSearchInput}) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='row mb-4'>
            <div className="col-md-8 mx-auto">
                <div className="card bg-white">
                    <div className="card-body d-flex">
                        <input type="text" className="form-control rounded-0" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search...'
                        />
                        <button className="btn btn-dark rounded-0"
                            disabled={!searchTerm}
                            onClick={() => handleSearchInput(searchTerm)}
                            >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
