import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: JSON.parse(localStorage.getItem('lang')) || 'en',
};


export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
            localStorage.setItem('lang', JSON.stringify(state.lang));
        }
    }
});


const settingReducer = settingSlice.reducer;


export const { setLang } = settingSlice.actions;

export default settingReducer;