import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL } from "../url/linkURL";


const initialState = {
    error: null,
    status: false,
    token: null,
    users: [],

};

export const loginUsers = createAsyncThunk(`loginUsers`, async (initialAuth) => {
    try {
        const res = await axios.post(LOGIN_URL, initialAuth)
        return res.data;
    } catch (err) {
        throw err.message;
    }
});

export const loginAuth = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userSuccess: (state, { payload: { users, token } }) => {
            state.users.push(users);
            state.token = token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUsers.pending, (state) => {
                state.status = true;
            })
            .addCase(loginUsers.fulfilled, (state, action) => {
                localStorage.setItem('token', JSON.stringify(action.payload.token));
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.users.push(action.payload);
                state.status = false;
            })
            .addCase(loginUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = false;
            });
    }

});

export const selectUser = state => state.users.users[0];
export const selectTokenUser = state => state.users.token;
export const selectStatusUser = state => state.users.status;
export const selectErrorUser = state => state.users.error;

export const { userSuccess, userLogout } = loginAuth.actions;
export default loginAuth.reducer;