import React from 'react'
import Sidebar from '../../components/Sidebar'
import { AdminMenu } from '../../components/Links'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkCreateUser, checkEditUser, checkResetPassword, checkUpdateUser, pendingUser, userEdit, userUpdate } from '../../features/dashboard/UserSlice'
import { useState } from 'react'
import ResetPassword from './ResetPassword'
import { useCallback } from 'react'
import swal from 'sweetalert'

const Profil = () => {
    const Menus = AdminMenu
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const dataEditProfil = useSelector(checkEditUser);
    const pending = useSelector(pendingUser);
    const checkCreate = useSelector(checkCreateUser);
    const checkUpdate = useSelector(checkUpdateUser);
    const checkReset = useSelector(checkResetPassword);
    const [showModalReset, setShowModalReset] = useState(false);
    const [inputEdit, setInputEdit] = useState({
        nama_pengguna: '',
        username: '',
        role: '',
    });

    useEffect(() => {
        checkCreate.response && swal("Gagal!", "Data gagal di tambahkan, isi data dengan benar!", "error");
        checkCreate.message === 'success' && swal('Berhasil!', "Data berhasil di tambahkan", "success");
        checkUpdate.response && swal("Gagal!", "Data gagal di edit, isi data dengan benar!", "error");
        checkUpdate.message === 'success' && swal("Berhasil!", "Data berhasil di edit", "success");
    }, [checkCreate, checkUpdate]);

    useEffect(() => {
        setIdUser(user.id);
    }, [user]);

    useEffect(() => {
        if (idUser) {
            dispatch(userEdit(idUser))
        }
    }, [dispatch, idUser]);

    useEffect(() => {
        checkReset?.response && swal("Gagal!", "Password gagal di reset!", "warning");
        checkReset?.item && swal("Berhasil!", "Password berhasil di reset, silahkan login ulang!", "success");
    }, [checkReset]);

    useEffect(() => {
        if (dataEditProfil?.item) {
            setInputEdit(dataEditProfil?.item);
        }
    }, [dataEditProfil]);


    const handleChange = useCallback((e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleEdit = () => {
        const data = {
            nama_pengguna: inputEdit.nama_pengguna,
            username: inputEdit.username,
            password: inputEdit.password,
            role: inputEdit.role,
            id: idUser,
        }
        dispatch(userUpdate(data));
    }

    return (
        <div>
            <Sidebar Menus={Menus} title={'Profile'}>
                <div>
                    {pending && (
                        <div className="flex flex-col justify-center items-center">
                            <div className="self-center mt-10 m-auto bg-amber-300 text-amber-800 p-2 rounded-md">Loading...</div>
                        </div>
                    )}

                    <div>
                        {!pending && (
                            <div>
                                <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                                    <h1 className='text-xl md:text-2xl font-semibold '>Profil Anda</h1>
                                    <p>Kelola Data Pribadi</p>
                                </div>
                                <div className="bg-slate-100 p-3 mb-8 md:p-5">
                                    <div className='mb-16 md:mb-8'>
                                        <button
                                            className='uppercase rounded-md self-start text-white bg-blue-600 hover:bg-blue-700 float-right font-light text-sm md:text-md md:font-medium py-1 px-2 md:py-2 md:px-3'
                                            onClick={() => setShowModalReset(true)}
                                        >
                                            Reset password
                                        </button>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className="flex flex-col gap-y-3">
                                            <div>
                                                <label htmlFor="nama_pengguna">Nama Pengguna</label>
                                                <input
                                                    className='bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5'
                                                    type="text"
                                                    id='nama_pengguna'
                                                    name='nama_pengguna'
                                                    placeholder='Nama Pengguna'
                                                    defaultValue={dataEditProfil?.item.nama_pengguna}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="username">Username</label>
                                                <input
                                                    className='bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5'
                                                    type="text"
                                                    id='username'
                                                    name='username'
                                                    placeholder='Username'
                                                    defaultValue={dataEditProfil?.item.username}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="">Role</label>
                                                <select
                                                    className='bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5'
                                                    type="text"
                                                    placeholder='Role'
                                                    defaultValue={dataEditProfil?.item.role}
                                                    onChange={handleChange}
                                                >
                                                    {dataEditProfil?.item &&
                                                        <option value={dataEditProfil?.item.role}>
                                                            {dataEditProfil?.item.role}
                                                        </option>
                                                    }
                                                    <option value="admin">Admin</option>
                                                    <option value="guru">Guru</option>
                                                    <option value="walas">Walas</option>
                                                    <option value="siswa">Siswa</option>
                                                </select>
                                            </div>
                                            <button
                                                className='uppercase rounded-md self-start text-white bg-green-600 hover:bg-green-700 font-light text-sm md:text-md md:font-medium py-1 px-2 md:py-2 md:px-3 mt-5'
                                                onClick={handleEdit}
                                            >Perbarui</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <ResetPassword isVisible={showModalReset} onClose={() => setShowModalReset(false)} />
            </Sidebar>
        </div>
    )
}

export default Profil