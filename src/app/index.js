import { configureStore } from "@reduxjs/toolkit";
import GuruSlice from "../features/dashboard/GuruSlice";
import loginAuth from "../features/authenticated/loginAuth";
import logoutAuth from "../features/authenticated/logoutAuth";
import MapelSlice from "../features/dashboard/MapelSlice";
import JurusanSlice from "../features/dashboard/JurusanSlice";
import TapelSlice from "../features/dashboard/TapelSlice";
import KelasSlice from "../features/dashboard/KelasSlice";

export const store = configureStore({
    reducer: {
        users: loginAuth,
        logout: logoutAuth,
        guru: GuruSlice,
        mapel: MapelSlice,
        jurusan: JurusanSlice,
        tapel: TapelSlice,
        kelas: KelasSlice,
    }
});


