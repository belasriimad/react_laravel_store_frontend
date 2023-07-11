import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../helpers/config';

const initialState = {
    products: [],
    categories: [],
    product: null,
    showSearchBox: false,
    loading: false,
    error: '',
    reviewed: false,
    all: false
}

export const fetchProducts = createAsyncThunk('fetch/products', async(page) => {
    const response = await axios.get(`${BASE_URL}/products?page=${page}`);
    return response.data;
});

export const fetchProductsBySCategory = createAsyncThunk('fetch/scategory/products', async({param, slug, page}) => {
    const response = await axios.get(`${BASE_URL}/${param}/${slug}/products?page=${page}`);
    return response.data;
});

export const filterProducts = createAsyncThunk('filter/products', async({params, page}) => {
    const response = await axios.post(`${BASE_URL}/filter/products?page=${page}`, {
        params
    });
    return response.data;
});

export const searchProducts = createAsyncThunk('search/products', async({searchTerm, page}) => {
    const response = await axios.post(`${BASE_URL}/search/products?page=${page}`, {
        searchTerm
    });
    return response.data;
});

export const fetchProduct = createAsyncThunk('fetch/product', async(slug) => {
    const response = await axios.get(`${BASE_URL}/products/${slug}`);
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toogleShowSearchBox(state, action) {
            state.showSearchBox = !state.showSearchBox;
        },
        checkIfProductAlreadyReviewedByUser(state, action) {
            const exists = state.product.reviews.some(review => 
                review.product_id === action.payload.product.id &&
                review.user_id === action.payload.user.id);
            state.reviewed = exists;
        },
        removeProductReview(state, action) {
            const updatedProductReviews = state.product.reviews.filter(review => review.id !== action.payload.id);
            state.product.reviews = updatedProductReviews;
        }
    },
    extraReducers: (builder) => {
        //fetch products loading
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        //fetch products fulfilled
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.categories = action.payload.categories;
            state.all = false;
            state.error = '';
        });
        //fetch products rejected
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //fetch products by scategory loading
        builder.addCase(fetchProductsBySCategory.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        //fetch products by scategory fulfilled
        builder.addCase(fetchProductsBySCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.error = '';
            state.all = true;
        });
        //fetch products by scategory rejected
        builder.addCase(fetchProductsBySCategory.rejected, (state, action) => {
            state.loading = false;
            state.all = false;
            state.error = action.error.message;
        });
        //filter products by params loading
        builder.addCase(filterProducts.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        //filter products by params fulfilled
        builder.addCase(filterProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.error = '';
            state.all = true;
        });
        //filter products by params rejected
        builder.addCase(filterProducts.rejected, (state, action) => {
            state.loading = false;
            state.all = false;
            state.error = action.error.message;
        });
        //search products by term loading
        builder.addCase(searchProducts.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        //search products by term fulfilled
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.error = '';
            state.all = true;
        });
        //search products by term rejected
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.loading = false;
            state.all = false;
            state.error = action.error.message;
        });
        //fetch product loading
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        //fetch product fulfilled
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            state.error = '';
        });
        //fetch product rejected
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


const productReducer = productSlice.reducer;


export const {toogleShowSearchBox, checkIfProductAlreadyReviewedByUser, removeProductReview} = productSlice.actions;

export default productReducer;