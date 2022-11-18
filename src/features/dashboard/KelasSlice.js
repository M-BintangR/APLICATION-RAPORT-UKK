import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { KELAS_CREATE_URL, KELAS_RECORD_URL, KELAS_EDIT_URL, KELAS_DELETE_URL, KELAS_UPDATE_URL } from "../url/linkURL";


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
        const res = await axios.post(KELAS_UPDATE_URL + initialUpdate.id, initialUpdate, {
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
    name: 'tapel',
    initialState,

    extraReducers: (builder) => {
        builder

            //? JURUSAN RECORD

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

            //? MAPEL CREATE

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

            //? MAPEL EDIT

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

            //? MAPEL UPDATE

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

            //? MAPEL UPDATE

            .addCase(kelasDelete.fulfilled, (state, action) => {
                state.kelasDelete = action.payload;
            });
    }

});

export default KelasSlice.reducer;