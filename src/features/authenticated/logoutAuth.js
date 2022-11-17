import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGOUT_URL } from '../url/linkURL';

const initialState = {
    message: '',
    status: false,
    error: '',
}

export const logoutUser = createAsyncThunk('logoutUser', async () => {
    try {
        const res = await axios.post(LOGOUT_URL, {}, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});


const logoutAuth = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.status = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.message = 'logout berhasil';
                state.status = true;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.message = 'logout gagal';
                state.status = false;
                state.error = action.error.message;
            });
    }
});

export const logoutCheck = state => state.logout.status;
export default logoutAuth.reducer;



