import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/userSlice";
import settingReducer from "../slices/settingSlice";


const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        setting: settingReducer
    }
});

export default store;