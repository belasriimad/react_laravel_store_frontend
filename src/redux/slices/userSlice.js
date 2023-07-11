import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: JSON.parse(sessionStorage.getItem('currentToken')) ? true : false,
    token: JSON.parse(sessionStorage.getItem('currentToken')) || '',
    validInfos: false,
    user: null
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.user = action.payload;
        },
        setLoggedInOut(state, action) {
            state.isLoggedIn = action.payload
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        checkIfUserDataIsValid(state, action) {
            if(state.user.phone_number && state.user.first_address
                && state.user.city && state.user.country
                && state.user.zip_code) {
                    state.validInfos = true;
            }else {
                state.validInfos = false;
            }
        }
    }
});


const userReducer = userSlice.reducer;


export const {setCurrentUser, setLoggedInOut, setToken, checkIfUserDataIsValid} = userSlice.actions;

export default userReducer;