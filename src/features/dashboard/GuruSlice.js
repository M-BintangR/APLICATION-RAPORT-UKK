import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GURU_CREATE_URL, GURU_RECORD_URL, GURU_VIEW_URL } from "../url/linkURL";


const initialState = {
    items: {},
    createCheck: {},
    viewCheck: {},
    deleteCheck: false,

    error: '',
    pending: false,
}


export const guruRecord = createAsyncThunk('guruRecord', async () => {
    try {
        const res = await axios.get(GURU_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err.message;
    }
});

export const guruDelete = createAsyncThunk('guruDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/admin/data/guru/${initialDelete}`, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err.message;
    }

});

export const guruCreate = createAsyncThunk('guruCreate', async (initialCreate) => {
    try {
        const res = await axios.post(GURU_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const guruView = createAsyncThunk('guruView', async (initialView) => {
    try {
        const res = await axios.get(GURU_VIEW_URL`/${initialView}`, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err.message;
    }
});


const GuruSlice = createSlice({
    name: 'guru',
    initialState,
    reducers: {
        setDeleteCheck: (state) => {
            state.deleteCheck = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(guruRecord.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.items = action.payload;
            })
            .addCase(guruRecord.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
                state.checkError = true;
            })
            .addCase(guruDelete.fulfilled, (state, action) => {
                state.deleteCheck = action.item;
            })
            .addCase(guruCreate.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.createCheck = action.payload;
            })
            .addCase(guruCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })
            .addCase(guruView.fulfilled, (state, action) => {
                state.viewCheck = action.payload;
            })
    }
});

export const selectAllGuru = state => state.guru.items;
export const guruPending = state => state.guru.pending;
export const checkDelete = state => state.guru.deleteCheck;
export const createGuruCheck = state => state.guru.createCheck;
export const errorGuru = state => state.guru.error;
export const checkErrorGuru = state => state.guru.checkError;
export const { setDeleteCheck } = GuruSlice.actions;

export default GuruSlice.reducer;