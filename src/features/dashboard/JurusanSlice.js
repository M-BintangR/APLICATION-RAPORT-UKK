import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JURUSAN_RECORD_URL } from "../url/linkURL";


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

const initialState = {
    jurusanRecord: {},
    pending: false,
    status: 'idle',
    error: {},
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
    }

});

export default JurusanSlice.reducer;