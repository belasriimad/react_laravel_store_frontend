import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            //get the product added by the user
            const item = action.payload;
            //check if product already exists in the cart
            let productItem = state.cartItems.find(product => product.id === item.id);
            //if product exists
            if(productItem) {
                productItem.quantity = item.quantity;
                productItem.size = item.size;
                productItem.color = item.color;
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                toast.success('Your product has been updated!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else {
                //if product does not exist we add to the cart
                state.cartItems = [item, ...state.cartItems];
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                toast.success('Your product has been saved!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        },
        incrementQ(state, action) {
            //get the product to increment quantity 
            const item = action.payload;
            //check if product already exists in the cart
            let productItem = state.cartItems.find(product => product.id === item.id);
            if(productItem) {
                if(productItem.quantity === productItem.maxQty) {
                    toast.success(`Only ${productItem.quantity} ${productItem.quantity > 1 ? 'are' : 'is'} availlable in stock!`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }else {
                    productItem.quantity += 1;
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                }
            }
        },
        decrementQ(state, action) {
            //get the product to decrement quantity 
            const item = action.payload;
            //check if product already exists in the cart
            let productItem = state.cartItems.find(product => product.id === item.id);
            if(productItem) {
                productItem.quantity -= 1;
                if(productItem.quantity === 0) {
                    state.cartItems = state.cartItems.filter(product => product.id !== item.id);
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        removeFromCart(state, action) {
            //get the product to remove from cart
            const item = action.payload;
            //remove product from cart
            state.cartItems = state.cartItems.filter(product => product.id !== item.id);
            if(!state.cartItems.length) {
                localStorage.removeItem('coupon');
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.success('Your product has been removed!', {
                position: toast.POSITION.TOP_RIGHT
            });
        },
        clearCartItems(state, action) {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
            localStorage.removeItem('coupon');
        },
        setCartItemDiscount(state, action) {
            const coupon_id = action.payload;
            state.cartItems = state.cartItems.map(item => {
                return {...item, coupon_id}
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }
});


const cartReducer = cartSlice.reducer;

export const {addToCart, incrementQ, decrementQ, removeFromCart, setCartItemDiscount, clearCartItems} = cartSlice.actions;

export default cartReducer;