import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import Alert from '../../../components/Alert';
import ModalUpdate from './ModalUpdate';
import ModalCreate from './ModalCreate';
import { useDispatch, useSelector } from 'react-redux';
import { checkCreateUser, checkUpdateUser, pendingUser, selectAllUser, userDelete, userRecord, userSearch } from '../../../features/dashboard/UserSlice';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';
import { TabelUser } from '../../../components/FieldTable';
import { useCallback } from 'react';

const Record = () => {
    const dispatch = useDispatch();
    const Menus = AdminMenu;
    const pending = useSelector(pendingUser);
    const dataUser = useSelector(selectAllUser);
    const checkCreate = useSelector(checkCreateUser);
    const checkUpdate = useSelector(checkUpdateUser);
    const [active, setActive] = useState('Data User');
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [checkAlert, setCheckAlert] = useState(false);
    const [idUser, setIdUser] = useState(false);
    const [errorData, setErrorData] = useState({
        message: '',
        status: '',
    });

    useEffect(() => {
        if (checkCreate.response) setErrorData({
            message: 'Data gagal di tambahkan, isi data dengan benar!',
            status: checkCreate?.response.status
        });
        if (checkCreate.message === 'success') setErrorData({
            message: 'Data berhasil di tambahkan',
            status: 200,
        })
    }, [checkCreate]);

    useEffect(() => {
        if (checkUpdate.response) setErrorData({
            message: 'Data gagal di edit, isi data dengan benar!',
            status: checkUpdate?.response.status
        })
        if (checkUpdate.message === 'success') setErrorData({
            message: 'Data berhasil di di edit',
            status: 200,
        })
    }, [checkUpdate]);

    useEffect(() => {
        dispatch(userRecord());
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(userDelete(id));
        setTimeout(() => {
            dispatch(userRecord());
        }, 500);

        setTimeout(() => {
            setCheckAlert(true);
        }, 2000)

        setTimeout(() => {
            setCheckAlert(false);
        }, 10000)
        dispatch(userRecord());
    }, [dispatch]);

    const handleUpdate = useCallback((id) => {
        setIdUser(id);
        setShowModalUpdate(true);
    }, []);

    const handleSearch = useCallback((e) => {
        dispatch(userSearch(e.target.value));
    }, [dispatch]);

    return (
        <div >
            <Sidebar Menus={Menus} active={active}>
                <div>

                    {pending && (
                        <Loading />
                    )}

                    {!pending && (
                        <div>
                            <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                                <h1 className='text-xl md:text-2xl font-semibold '>Data User
                                    <button
                                        className=' py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-green-600 hover:bg-green-500 text-white rounded-md uppercase md:text-sm'
                                        onClick={() => setShowModalCreate(prev => prev = true)}
                                    >Tambah</button>
                                </h1>
                                <p>Kelola Data User</p>
                            </div>

                            {errorData?.status === 422 && (
                                <Message type={'error'} pesan={errorData.message} />
                            )}

                            {errorData?.status === 200 && (
                                <Message type={'success'} pesan={errorData.message} />
                            )}

                            <h1 className='text-lg md:text-xl pb-2 font-medium md:font-semibold md:my-2'>Record Data
                                <div className="float-right">
                                    <input
                                        className='p-1 rounded-md border shadow-sm border-sky-200 text-sm w-[100px] md:w-[150px] bg-slate-100 focus:bg-slate-200 focus:outline-sky-200'
                                        type="text"
                                        placeholder='Search'
                                        onInput={handleSearch}
                                    />
                                </div>
                            </h1>
                            <div className="overflow-x-scroll mt-2 rounded-lg shadow mb-20">
                                <table className='w-full'>
                                    <thead className='bg-slate-900 text-white border-b-2 border-gray-200 py-1'>
                                        <tr >
                                            {TabelUser.map((tabel, i) => (
                                                <th className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>
                                        {dataUser?.items && dataUser?.items.map((user, i) => (
                                            <tr key={i} className={`bg-white`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{i + 1}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{user.nama_pengguna ? user?.nama_pengguna : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{user.username ? user?.username : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-white uppercase text-sm'>
                                                        <span className={`py-0.3 px-1 rounded-sm ${user?.role === "admin" ? 'bg-green-600' : ''} ${user?.role === "guru" ? 'bg-amber-600' : ''} ${user?.role === "walas" ? 'bg-blue-600' : ''} ${user?.role === "siswa" ? 'bg-red-600' : ''}`}>
                                                            {user?.role ? user?.role : '-'}
                                                        </span>
                                                    </td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                                            onClick={() => handleUpdate(user?.id)}

                                                        >
                                                            <BiEdit className='inline' />
                                                        </button>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                                            onClick={() => handleDelete(user?.id)}
                                                        >
                                                            <BiTrash className='inline' />
                                                        </button>
                                                    </td>
                                                </>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {checkAlert && (
                        <Alert pesan={'Data berhasil dihapus'} />
                    )}
                </div>
                <ModalCreate isVisible={showModalCreate} onClose={() => setShowModalCreate(false)} />
                <ModalUpdate isVisible={showModalUpdate} onClose={() => setShowModalUpdate(false)} idUser={idUser} />
            </Sidebar >
        </div >
    );
}

export default Record