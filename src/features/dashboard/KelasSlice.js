import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { KELAS_CREATE_URL, KELAS_RECORD_URL, KELAS_EDIT_URL, KELAS_DELETE_URL, KELAS_UPDATE_URL, KELAS_SEARCH_URL } from "../url/linkURL";


export const kelasRecord = createAsyncThunk('kelasRecord', async () => {
    try {
        const res = await axios.get(KELAS_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const kelasCreate = createAsyncThunk('kelasCreate', async (initialCreate) => {
    try {
        const res = await axios.post(KELAS_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const kelasEdit = createAsyncThunk('kelasEdit', async (initialEdit) => {
    try {
        const res = await axios.get(KELAS_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const kelasUpdate = createAsyncThunk('kelasUpdate', async (initialUpdate) => {
    try {
        const res = await axios.put(KELAS_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const kelasDelete = createAsyncThunk('kelasDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(KELAS_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const kelasSearch = createAsyncThunk('kelasSearch', async (query) => {
    try {
        const res = await axios.get(KELAS_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const paginateKelas = createAsyncThunk('paginateKelas', async (pageLink) => {
    try {
        const res = await axios.get(pageLink, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    kelasRecord: {},
    kelasDelete: {},
    kelasEdit: {},
    kelasUpdate: {},
    kelasCreate: {},
    error: {},
    pending: false,
    status: 'idle',
}

const KelasSlice = createSlice({
    name: 'kelas',
    initialState,

    extraReducers: (builder) => {
        builder

            //? KELAS RECORD

            .addCase(kelasRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(kelasRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.kelasRecord = action.payload;
            })
            .addCase(kelasRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            })

            //? KELAS CREATE

            .addCase(kelasCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(kelasCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.kelasCreate = action.payload;
                state.status = 'success';
            })
            .addCase(kelasCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? KELAS EDIT

            .addCase(kelasEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(kelasEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.kelasEdit = action.payload;
                state.status = 'success';
            })
            .addCase(kelasEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? KELAS UPDATE

            .addCase(kelasUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(kelasUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.kelasUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(kelasUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? KELAS UPDATE

            .addCase(kelasDelete.fulfilled, (state, action) => {
                state.kelasDelete = action.payload;
            })

            //? KELAS SEARCH

            .addCase(kelasSearch.fulfilled, (state, action) => {
                state.kelasRecord = action.payload;
            })

            .addCase(paginateKelas.fulfilled, (state, action) => {
                state.kelasRecord = action.payload;
            })
    }

});

export const selectAllKelas = state => state.kelas.kelasRecord;
export const checkCreateKelas = state => state.kelas.kelasCreate;
export const checkEditKelas = state => state.kelas.kelasEdit;
export const checkUpdateKelas = state => state.kelas.kelasUpdate;
export const checkDelete = state => state.kelas.kelasDelete;
export const pendingKelas = state => state.kelas.pending;
export default KelasSlice.reducer;