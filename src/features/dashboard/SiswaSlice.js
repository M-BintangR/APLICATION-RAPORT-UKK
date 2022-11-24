import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SISWA_CREATE_URL, SISWA_RECORD_URL, SISWA_EDIT_URL, SISWA_DELETE_URL, SISWA_UPDATE_URL, SISWA_SEARCH_URL } from "../url/linkURL";


export const siswaRecord = createAsyncThunk('siswaRecord', async () => {
    try {
        const res = await axios.get(SISWA_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const siswaCreate = createAsyncThunk('siswaCreate', async (initialCreate) => {
    try {
        const res = await axios.post(SISWA_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const siswaEdit = createAsyncThunk('siswaEdit', async (initialEdit) => {
    try {
        const res = await axios.get(SISWA_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const siswaUpdate = createAsyncThunk('siswaUpdate', async (initialUpdate) => {
    try {
        const res = await axios.put(SISWA_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const siswaDelete = createAsyncThunk('siswaDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(SISWA_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const siswaSearch = createAsyncThunk('siswaSearch', async (query) => {
    try {
        const res = await axios.get(SISWA_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    siswaRecord: {},
    siswaDelete: {},
    siswaEdit: {},
    siswaUpdate: {},
    siswaCreate: {},
    error: {},
    pending: false,
    status: 'idle',
}

const SiswaSlice = createSlice({
    name: 'siswa',
    initialState,

    extraReducers: (builder) => {
        builder

            //? SISWA RECORD

            .addCase(siswaRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(siswaRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.siswaRecord = action.payload;
            })
            .addCase(siswaRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            })

            //? SISWA CREATE

            .addCase(siswaCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(siswaCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.siswaCreate = action.payload;
                state.status = 'success';
            })
            .addCase(siswaCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? SISWA EDIT

            .addCase(siswaEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(siswaEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.siswaEdit = action.payload;
                state.status = 'success';
            })
            .addCase(siswaEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? SISWA UPDATE

            .addCase(siswaUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(siswaUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.siswaUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(siswaUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? SISWA UPDATE

            .addCase(siswaDelete.fulfilled, (state, action) => {
                state.siswaDelete = action.payload;
            })

            //? SISWA SEARCH

            .addCase(siswaSearch.fulfilled, (state, action) => {
                state.siswaRecord = action.payload;
            });
    }

});

export const selectALlSiswa = state => state.siswa.siswaRecord;
export const checkCreateSiswa = state => state.siswa.siswaCreate;
export const checkEditSiswa = state => state.siswa.siswaEdit;
export const checkUpdateSiswa = state => state.siswa.siswaUpdate;
export const checkDeleteSiswa = state => state.siswa.siswaDelete;
export const pendingSiswa = state => state.siswa.pending;
export const errorSiswa = state => state.siswa.error;
export default SiswaSlice.reducer;