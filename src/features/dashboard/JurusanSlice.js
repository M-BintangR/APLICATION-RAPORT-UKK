import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JURUSAN_CREATE_URL, JURUSAN_RECORD_URL, JURUSAN_EDIT_URL, JURUSAN_DELETE_URL, JURUSAN_UPDATE_URL, JURUSAN_SEARCH_URL } from "../url/linkURL";


export const jurusanRecord = createAsyncThunk('jurusanRecord', async () => {
    try {
        const res = await axios.get(JURUSAN_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const jurusanCreate = createAsyncThunk('jurusanCreate', async (initialCreate) => {
    try {
        const res = await axios.post(JURUSAN_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const jurusanEdit = createAsyncThunk('jurusanEdit', async (initialEdit) => {
    try {
        const res = await axios.get(JURUSAN_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const jurusanUpdate = createAsyncThunk('jurusanUpdate', async (initialUpdate) => {
    try {
        const res = await axios.put(JURUSAN_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const jurusanDelete = createAsyncThunk('jurusanDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(JURUSAN_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const jurusanSearch = createAsyncThunk('jurusanSearch', async (query) => {
    try {
        const res = await axios.get(JURUSAN_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    jurusanRecord: {},
    jurusanDelete: {},
    jurusanEdit: {},
    jurusanUpdate: {},
    jurusanCreate: {},
    error: {},
    pending: false,
    status: 'idle',
}

const JurusanSlice = createSlice({
    name: 'jurusan',
    initialState,

    extraReducers: (builder) => {
        builder

            //? JURUSAN RECORD

            .addCase(jurusanRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(jurusanRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.jurusanRecord = action.payload;
            })
            .addCase(jurusanRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            })

            //? JURUSAN CREATE

            .addCase(jurusanCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(jurusanCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.jurusanCreate = action.payload;
                state.status = 'success';
            })
            .addCase(jurusanCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? JURUSAN EDIT

            .addCase(jurusanEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(jurusanEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.jurusanEdit = action.payload;
                state.status = 'success';
            })
            .addCase(jurusanEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? JURUSAN UPDATE

            .addCase(jurusanUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(jurusanUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.jurusanUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(jurusanUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? JURUSAN DELETE

            .addCase(jurusanDelete.fulfilled, (state, action) => {
                state.jurusanDelete = action.payload;
            })

            //? JURUSAN SEARCH

            .addCase(jurusanSearch.fulfilled, (state, action) => {
                state.jurusanRecord = action.payload;
            });

    }

});

export const selectAllJurusan = state => state.jurusan.jurusanRecord;
export const checkCreateJurusan = state => state.jurusan.jurusanCreate;
export const checkUpdateJurusan = state => state.jurusan.jurusanUpdate;
export const checkEditJurusan = state => state.jurusan.jurusanEdit;
export const checkPendingJurusan = state => state.jurusan.pending;
export default JurusanSlice.reducer;
