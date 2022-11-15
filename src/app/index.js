import { configureStore } from "@reduxjs/toolkit";
import GuruSlice from "../features/dashboard/GuruSlice";
import loginAuth from "../features/authenticated/loginAuth";
import logoutAuth from "../features/authenticated/logoutAuth";
import MapelSlice from "../features/dashboard/MapelSlice";

export const store = configureStore({
    reducer: {
        users: loginAuth,
        logout: logoutAuth,
        guru: GuruSlice,
        mapel: MapelSlice,
    }
});


