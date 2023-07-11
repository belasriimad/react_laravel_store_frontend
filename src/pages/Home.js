import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsBySCategory, filterProducts, searchProducts } from '../redux/slices/productSlice';
import ProductList from '../components/products/ProductList';
import Categories from '../components/categories/Categories';
import FilterChecks from '../components/filters/FilterChecks';
import Spinner from '../components/spinner/Spinner';
import SearchBox from '../components/products/SearchBox';
import useTitle  from '../helpers/useTitle';
import Error from '../components/404/Error';

export default function Home() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [catParams, setCatParams] = useState(null);
    const [filterParams, setFilterParams] = useState({
        params: []
    });
    const [searchParams, setSearchParams] = useState(null);
    const {products, categories, all, loading, showSearchBox, error} = useSelector(state => state.product);

    //set page title
    useTitle('Home');

    useEffect(() => {
        fetchData();
    }, [page, catParams, filterParams.params, searchParams]);

    const handleSCategoryChange = (data) => {
        setPage(1);
        setFilterParams({
            params: []
        });
        setSearchParams(null);
        setCatParams(data);
    }

    const fetchNextPrevProducts = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
    }

    const handleInputChange = (e) => {
        let exists = filterParams.params.find(filter => filter === e.target.value);
        if(exists) {
            const updatedFilters = filterParams.params.filter(filter => filter !== e.target.value);
            setFilterParams({
                params: updatedFilters
            });
        }else {
            setSearchParams(null);
            setCatParams(null);
            setPage(1);
            setFilterParams({
                params: [...filterParams.params, e.target.value]
            });
        }
    }

    const fetchData = () => {
        try {
            if(catParams) {
                catParams.page = page;
                dispatch(fetchProductsBySCategory(catParams));
            }else if(filterParams.params.length > 0) {
                filterParams.page = page;
                dispatch(filterProducts(filterParams));
            }else if(searchParams) {
                searchParams.page = page;
                dispatch(searchProducts(searchParams));
            }else {
                dispatch(fetchProducts(page));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchInput = (searchTerm) => {
        setFilterParams({
            params: []
        });
        setPage(1);
        setCatParams(null);
        setSearchParams({
            searchTerm
        });
    }

    return (
        <div className='container'>
            <Error /> 
            {
                loading ? 
                    <Spinner /> 
                :
                !error && 
                <div className="row my-5 pb-5">
                    {
                        showSearchBox && <SearchBox handleSearchInput={handleSearchInput}/>
                    }
                    <div className="col-md-8 card bg-white p-3">
                        <ProductList products={products} fetchNextPrevProducts={fetchNextPrevProducts} />
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-white">
                            <div className="card-header bg-white">
                                <h4 className='my-3'>
                                    <i className="bi bi-bookmark-fill"></i> 
                                    {
                                        all ? (
                                            <span 
                                                onClick={() => handleSCategoryChange(null)}
                                                className="text-danger mx-1"
                                                style={{cursor: 'pointer'}}>
                                                All
                                            </span>
                                        )
                                        :
                                        ''
                                    }
                                    Categories
                                </h4>
                            </div>
                            <div className="card-body">
                                <Categories categories={categories} 
                                    handleSCategoryChange={handleSCategoryChange} />
                            </div>
                        </div>
                        <div className="card bg-white my-2">
                            <div className="card-header bg-white">
                                <h4 className="my-2">
                                    <i className="bi bi-funnel"></i> Filters
                                </h4>
                            </div>
                            <div className="card-body">
                                <FilterChecks filterParams={filterParams}
                                    handleInputChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
