import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WALAS_CREATE_URL, WALAS_RECORD_URL, WALAS_EDIT_URL, WALAS_DELETE_URL, WALAS_UPDATE_URL, WALAS_SEARCH_URL } from "../url/linkURL";


export const walasRecord = createAsyncThunk('walasRecord', async () => {
    try {
        const res = await axios.get(WALAS_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const walasCreate = createAsyncThunk('walasCreate', async (initialCreate) => {
    try {
        const res = await axios.post(WALAS_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const walasEdit = createAsyncThunk('walasEdit', async (initialEdit) => {
    try {
        const res = await axios.get(WALAS_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const walasUpdate = createAsyncThunk('walasUpdate', async (initialUpdate) => {
    try {
        const res = await axios.put(WALAS_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const walasDelete = createAsyncThunk('walasDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(WALAS_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const walasSearch = createAsyncThunk(' walasSearch', async (query) => {
    try {
        const res = await axios.get(WALAS_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    walasRecord: {},
    walasDelete: {},
    walasEdit: {},
    walasUpdate: {},
    walasCreate: {},
    error: {},
    pending: false,
    status: 'idle',
}

const WalasSlice = createSlice({
    name: 'tapel',
    initialState,

    extraReducers: (builder) => {
        builder

            //? WALAS RECORD

            .addCase(walasRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(walasRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.walasRecord = action.payload;
            })
            .addCase(walasRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            })

            //? WALAS CREATE

            .addCase(walasCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(walasCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.walasCreate = action.payload;
                state.status = 'success';
            })
            .addCase(walasCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? WALAS EDIT

            .addCase(walasEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(walasEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.walasEdit = action.payload;
                state.status = 'success';
            })
            .addCase(walasEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? WALAS UPDATE

            .addCase(walasUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(walasUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.walasUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(walasUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? WALAS UPDATE

            .addCase(walasDelete.fulfilled, (state, action) => {
                state.walasDelete = action.payload;
            })

            //? WALAS SEARCH

            .addCase(walasSearch.fulfilled, (state, action) => {
                state.walasRecord = action.payload;
            });
    }

});

export const selectAllWalas = state => state.walas.walasRecord;
export const pendingWalas = state => state.walas.pending;
export const checkCreateWalas = state => state.walas.walasCreate;
export const checkEditWalas = state => state.walas.walasEdit;
export const checkUpdateWalas = state => state.walas.walasUpdate;
export const checkDeleteWalas = state => state.walas.walasDelete;
export default WalasSlice.reducer;