import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOME_DASHBOARD_URL } from "../url/linkURL";

export const homeRecord = createAsyncThunk('homeRecord', async () => {
    try {
        const res = await axios.get(HOME_DASHBOARD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    recordHome: {},
    error: {},
    pending: false,
    status: 'idle',
}

const HomeSlice = createSlice({
    name: 'home',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(homeRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(homeRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.recordHome = action.payload;
            })
            .addCase(homeRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            });
    }
});


export const pendingHomeDashboard = state => state.home.pending;
export const errorHomeDashboard = state => state.home.error;
export const selectAllHome = state => state.home.recordHome;
export default HomeSlice.reducer;