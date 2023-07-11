import React from 'react';

export default function FilterChecks({handleInputChange, filterParams}) {
    const filterCheckboxs = [
        {
            id: 'check1',
            label: 'Hot deal',
            value: 'hot_deal'
        },
        {
            id: 'check2',
            label: 'Featured',
            value: 'featured'
        },
        {
            id: 'check3',
            label: 'Best seller',
            value: 'best_seller'
        },
        {
            id: 'check4',
            label: 'New',
            value: 'new'
        }
    ];
    return (
        <ul className='list-group'>
            {
                filterCheckboxs.map(checkbox => (
                    <li key={checkbox.id} className="list-group-item">
                        <div className="form-check flex-grow-1">
                            <input type="checkbox" 
                                id={checkbox.id}
                                value={checkbox.value}
                                onChange={(e) => handleInputChange(e)}
                                checked={filterParams.params.some(value => value === checkbox.value )}
                                className="form-check-input" />
                            <label htmlFor={checkbox.id} className="form-check-label">
                                {checkbox.label}
                            </label>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
