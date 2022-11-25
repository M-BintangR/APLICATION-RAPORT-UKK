import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { GURU_CREATE_URL, GURU_DELETE_URL, GURU_EDIT_URL, GURU_RECORD_URL, GURU_SEARCH_URL, GURU_UPDATE_URL } from "../url/linkURL";



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
        const res = await axios.delete(GURU_DELETE_URL + initialDelete, {
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

export const guruEdit = createAsyncThunk('guruEdit', async (initialEdit) => {
    try {
        const res = await axios.get(GURU_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const guruUpdate = createAsyncThunk('guruUpdate', async (initialUpdate) => {
    try {
        const res = await axios.post(GURU_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});


export const guruSearch = createAsyncThunk('guruSearch', async (query) => {
    try {
        const res = await axios.get(GURU_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});


const initialState = {
    items: {},
    createCheck: {},
    editCheck: {},
    updateCheck: {},
    deleteCheck: false,
    pending: false,
    error: '',
}

const GuruSlice = createSlice({
    name: 'guru',
    initialState,
    reducers: {
        setDeleteCheck: (state) => {
            state.deleteCheck = false;
        },
    },
    extraReducers: (builder) => {
        builder

            //? GURU RECORD

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

            //? GURU DELETE

            .addCase(guruDelete.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruDelete.fulfilled, (state, action) => {
                state.pending = false;
                state.deleteCheck = action.item;
            })
            .addCase(guruDelete.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? GURU CREATE

            .addCase(guruCreate.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.createCheck = action.payload;
            })
            .addCase(guruCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })

            //? GURU EDIT

            .addCase(guruEdit.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.editCheck = action.payload;
            })
            .addCase(guruEdit.rejected, (state, action) => {
                state.error = true;
                state.pending = action.error;
            })

            //? GURU UPDATE

            .addCase(guruUpdate.pending, (state) => {
                state.pending = true;
            })
            .addCase(guruUpdate.fulfilled, (state, action) => {
                state.updateCheck = action.payload;
                state.pending = false;
            })
            .addCase(guruUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? GURU SEARCH

            .addCase(guruSearch.fulfilled, (state, action) => {
                state.items = action.payload;
            });

    }
});

export const selectAllGuru = state => state.guru.items;
export const guruPending = state => state.guru.pending;
export const checkDelete = state => state.guru.deleteCheck;
export const createGuruCheck = state => state.guru.createCheck;
export const checkEditGuru = state => state.guru.editCheck;
export const checkUpdateGuru = state => state.guru.updateCheck;
export const errorGuru = state => state.guru.error;
export const checkErrorGuru = state => state.guru.checkError;
export const { setDeleteCheck, searchData } = GuruSlice.actions;

export default GuruSlice.reducer;