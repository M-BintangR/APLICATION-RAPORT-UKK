import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MAPEL_CREATE_URL, MAPEL_EDIT_URL, MAPEL_RECORD_URL, MAPEL_UPDATE_URL, MAPEL_DELETE_URL, MAPEL_SEARCH_URL } from "../url/linkURL";


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

export const mapelCreate = createAsyncThunk('mapelCreate', async (initialCreate) => {
    try {
        const res = await axios.post(MAPEL_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const mapelEdit = createAsyncThunk('mapelEdit', async (initialEdit) => {
    try {
        const res = await axios.get(MAPEL_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const mapelUpdate = createAsyncThunk('mapelUpdate', async (initialUpdate) => {
    try {
        const res = await axios.post(MAPEL_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const mapelDelete = createAsyncThunk('mapelUpdate', async (initialDelete) => {
    try {
        const res = await axios.delete(MAPEL_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const mapelSearch = createAsyncThunk('mapelSearch', async (query) => {
    try {
        const res = await axios.get(MAPEL_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    items: {},
    mapelCreate: {},
    mapelEdit: {},
    mapelUpdate: {},
    mapelDelete: {},
    error: {},
    pending: false,
    status: 'idle',
}

const MapelSlice = createSlice({
    name: 'mapel',
    initialState,
    extraReducers: (builder) => {
        builder

            //? MAPEL RECORD

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

            //? MAPEL CREATE

            .addCase(mapelCreate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(mapelCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.mapelCreate = action.payload;
                state.status = 'success';
            })
            .addCase(mapelCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? MAPEL EDIT

            .addCase(mapelEdit.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(mapelEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.mapelEdit = action.payload;
                state.status = 'success';
            })
            .addCase(mapelEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })


            //? MAPEL UPDATE

            .addCase(mapelUpdate.pending, (state) => {
                state.pending = true;
                state.status = 'loading';
            })
            .addCase(mapelUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.mapelUpdate = action.payload;
                state.status = 'success';
            })
            .addCase(mapelUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })

            //? MAPEL SEARCH

            .addCase(mapelSearch.fulfilled, (state, action) => {
                state.items = action.payload;
            });







    }
});

export const selectAllMapel = state => state.mapel.items;
export const checkCreateMapel = state => state.mapel.mapelCreate;
export const checkUpdateMapel = state => state.mapel.mapelUpdate;
export const checkEditMapel = state => state.mapel.mapelEdit;
export const selectStatusMapel = state => state.mapel.status;
export const selectErrorMapel = state => state.mapel.error;
export const pendingMapel = state => state.mapel.pending;
export default MapelSlice.reducer;