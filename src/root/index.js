import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import RecordJurusan from '../pages/dashboard/dataJurusan/Record';
import RecordKelas from '../pages/dashboard/dataKelas/Record';
import RecordSiswa from '../pages/dashboard/dataSiswa/Record';
import RecordGuru from '../pages/dashboard/dataGuru/Record';
import RecordTapel from '../pages/dashboard/dataTapel/Record';
import RecordWalas from '../pages/dashboard/dataWalas/Record';
import RecordUser from '../pages/dashboard/dataUser/Record';
import RecordMapel from '../pages/dashboard/dataMapel/Record';
import Home from '../pages/dashboard/Home';
import HomeSiswa from '../pages/dashboardSiswa/Home';
import HomeWalas from '../pages/dashboardWalas/Home';
import HomeGuru from '../pages/dashboardGuru/Home';
import { Navigate } from 'react-router-dom';
import RequireAdmin from '../middleware/RequireAdmin';
import Profil from '../pages/dashboard/Profil';
import RequireLogin from '../middleware/RequireLogin';
import RequireSiswa from '../middleware/RequireSiswa';
import RequireGuru from '../middleware/RequireGuru';
import RequireWalas from '../middleware/RequireWalas';



const Root = () => {



    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/dashboard'
                        element={
                            <RequireAdmin>
                                <Home />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/guru'
                        element={
                            <RequireAdmin>
                                <RecordGuru />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/jurusan'
                        element={
                            <RequireAdmin>
                                <RecordJurusan />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/walas'
                        element={
                            <RequireAdmin>
                                <RecordWalas />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/tapel'
                        element={
                            <RequireAdmin>
                                <RecordTapel />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/kelas'
                        element={
                            <RequireAdmin>
                                <RecordKelas />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/siswa'
                        element={
                            <RequireAdmin>
                                <RecordSiswa />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/user'
                        element={
                            <RequireAdmin>
                                <RecordUser />
                            </RequireAdmin>
                        } />
                    <Route
                        path='/dashboard/data/mapel'
                        element={
                            <RequireAdmin>
                                <RecordMapel />
                            </RequireAdmin>
                        } />

                    <Route
                        path='/dashboard/profil'
                        element={
                            <RequireAdmin>
                                <Profil />
                            </RequireAdmin>
                        } />


                    <Route
                        index
                        path='/'
                        element={
                            <RequireLogin>
                                <Login />
                            </RequireLogin>
                        } />

                    <Route
                        path='/dashboard-siswa'
                        element={
                            <RequireSiswa>
                                <HomeSiswa />
                            </RequireSiswa>
                        }
                    />

                    <Route
                        path='/dashboard-guru'
                        element={
                            <RequireGuru>
                                <HomeGuru />
                            </RequireGuru>
                        }
                    />

                    <Route
                        path='/dashboard-walas'
                        element={
                            <RequireWalas>
                                <HomeWalas />
                            </RequireWalas>
                        }
                    />

                    <Route
                        path='*'
                        element={
                            <Navigate to='/' replace />
                        } />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Root