import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TAPEL_CREATE_URL, TAPEL_RECORD_URL, TAPEL_EDIT_URL, TAPEL_DELETE_URL, TAPEL_UPDATE_URL } from "../url/linkURL";


export const tapelRecord = createAsyncThunk('tapelRecord', async () => {
    try {
        const res = await axios.get(TAPEL_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const tapelCreate = createAsyncThunk('tapelCreate', async (initialCreate) => {
    try {
        const res = await axios.post(TAPEL_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const tapelEdit = createAsyncThunk('tapelEdit', async (initialEdit) => {
    try {
        const res = await axios.get(TAPEL_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const tapelUpdate = createAsyncThunk('tapelUpdate', async (initialUpdate) => {
    try {
        const res = await axios.post(TAPEL_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const tapelDelete = createAsyncThunk('tapelDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(TAPEL_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    tapelRecord: {},
    tapelDelete: {},
    tapelEdit: {},
    tapelUpdate: {},
    tapelCreate: {},
    error: {},
    pending: false,
    status: 'idle',
}

const TapelSlice = createSlice({
    name: 'tapel',
    initialState,

    extraReducers: (builder) => {
        builder

            //? JURUSAN RECORD

            .addCase(tapelRecord.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(tapelRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.status = 'success';
                state.tapelRecord = action.payload;
            })
            .addCase(tapelRecord.rejected, (state, action) => {
                state.pending = false;
                state.status = 'error';
                state.error = action.error;
            })

            //? MAPEL CREATE

            .addCase(tapelCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(tapelCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.tapelCreate = action.payload;
                state.status = 'success';
            })
            .addCase(tapelCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? MAPEL EDIT

            .addCase(tapelEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(tapelEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.tapelEdit = action.payload;
                state.status = 'success';
            })
            .addCase(tapelEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? MAPEL UPDATE

            .addCase(tapelUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(tapelUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.tapelUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(tapelUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? MAPEL UPDATE

            .addCase(tapelDelete.fulfilled, (state, action) => {
                state.tapelDelete = action.payload;
            });
    }

});

export const selectAllTapel = state => state.tapel.tapelRecord;
export const pendingTapel = state => state.tapel.pending;
export const checkCreateTapel = state => state.tapel.tapelCreate;
export const checkEditTapel = state => state.tapel.tapelEdit;
export const checkUpdateTapel = state => state.tapel.tapelUpdate;
export const checkDeleteTapel = state => state.tapel.tapelDelete;

export default TapelSlice.reducer;