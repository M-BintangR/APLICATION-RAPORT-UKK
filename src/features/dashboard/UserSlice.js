import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RESET_PASSWORD_URL, USER_CREATE_URL, USER_DELETE_URL, USER_EDIT_URL, USER_RECORD_URL, USER_SEARCH_URL, USER_UPDATE_URL } from "../url/linkURL";

export const userRecord = createAsyncThunk('userRecord', async (initialRecord) => {
    try {
        const res = await axios.get(USER_RECORD_URL, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const userCreate = createAsyncThunk('userCreate', async (initialCreate) => {
    try {
        const res = await axios.post(USER_CREATE_URL, initialCreate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const userEdit = createAsyncThunk('userEdit', async (initialEdit) => {
    try {
        const res = await axios.get(USER_EDIT_URL + initialEdit + '/edit', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const userUpdate = createAsyncThunk('userUpdate', async (initialUpdate) => {
    try {
        const res = await axios.put(USER_UPDATE_URL + initialUpdate.id, initialUpdate, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const userDelete = createAsyncThunk('userDelete', async (initialDelete) => {
    try {
        const res = await axios.delete(USER_DELETE_URL + initialDelete, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const userSearch = createAsyncThunk('userSearch', async (query) => {
    try {
        const res = await axios.get(USER_SEARCH_URL + query, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

export const resetPassword = createAsyncThunk('resetPassword', async (initialId) => {
    try {
        const res = await axios.post(RESET_PASSWORD_URL + initialId, {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
});

const initialState = {
    userRecord: {},
    userUpdate: {},
    userDelete: {},
    userCreate: {},
    resetPassword: {},
    pending: false,
    error: {},
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder

            //? USER RECORD

            .addCase(userRecord.pending, (state) => {
                state.pending = true;
            })
            .addCase(userRecord.fulfilled, (state, action) => {
                state.pending = false;
                state.userRecord = action.payload;
            })
            .addCase(userRecord.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? USER CREATE

            .addCase(userCreate.pending, (state) => {
                state.pending = true;
            })
            .addCase(userCreate.fulfilled, (state, action) => {
                state.pending = false;
                state.userCreate = action.payload;
            })
            .addCase(userCreate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? USER UPDATE

            .addCase(userUpdate.pending, (state) => {
                state.pending = true;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.pending = false;
                state.userUpdate = action.payload;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? USER EDIT

            .addCase(userEdit.pending, (state) => {
                state.pending = true;
            })
            .addCase(userEdit.fulfilled, (state, action) => {
                state.pending = false;
                state.userEdit = action.payload;
            })
            .addCase(userEdit.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error;
            })

            //? USER DELETE

            .addCase(userDelete.fulfilled, (state, action) => {
                state.userDelete = action.payload;
            })

            //? USER SEARCH

            .addCase(userSearch.fulfilled, (state, action) => {
                state.userRecord = action.payload;
            })

            //? PASSWORD RESET

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPassword = action.payload;
            })

    }

});

export const selectAllUser = state => state.user.userRecord;
export const checkCreateUser = state => state.user.userCreate;
export const checkUpdateUser = state => state.user.userUpdate;
export const checkEditUser = state => state.user.userEdit;
export const checkResetPassword = state => state.user.resetPassword;
export const checkDeleteUser = state => state.user.userDelete;
export const pendingUser = state => state.user.pending;
export default UserSlice.reducer;