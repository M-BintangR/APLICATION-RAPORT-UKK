import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MAPEL_RECORD_URL } from "../url/linkURL";

const initialState = {
    items: {},
    pending: false,
    status: 'idle',
    error: '',
}

export const mapelRecord = createAsyncThunk('mapelRecord', async () => {
    try {
        const res = await axios.get(MAPEL_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
        return res.data;
    } catch (err) {
        return err.message;
    }
});

const MapelSlice = createSlice({
    name: 'mapel',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(mapelRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(mapelRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(mapelRecord.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })
    }
});

export const selectAllMapel = state => state.mapel.items;
export const selectStatusMapel = state => state.mapel.status;
export const selectErrorMapel = state => state.mapel.error;
export const pendingMapel = state => state.mapel.pending;
export default MapelSlice.reducer;