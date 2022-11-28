import React from 'react'
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { BiTrash, BiEdit } from 'react-icons/bi';
import ModalCreate from './ModalCreate';
import ModalUpdate from './ModalUpdate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCreateJurusan, checkPendingJurusan, checkUpdateJurusan, jurusanDelete, jurusanRecord, jurusanSearch, selectAllJurusan } from '../../../features/dashboard/JurusanSlice';
import Alert from '../../../components/Alert';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';

const Record = () => {
    const dispatch = useDispatch();
    const Menus = AdminMenu;
    const pending = useSelector(checkPendingJurusan);
    const dataJurusan = useSelector(selectAllJurusan);
    const checkCreate = useSelector(checkCreateJurusan);
    const checkUpdate = useSelector(checkUpdateJurusan);
    const [active, setActive] = useState('Data Jurusan');
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const [checkAlert, setCheckAlert] = useState(false);
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
        dispatch(jurusanRecord());
    }, [dispatch]);

    const handleSearch = (e) => {
        dispatch(jurusanSearch(e.target.value));
    }

    const handleUpdate = (id) => {
        setIdUser(id);

        setShowModalUpdate(prev => prev = true);
    }

    const handleDelete = (id) => {
        dispatch(jurusanDelete(id));
        setTimeout(() => {
            dispatch(jurusanRecord());
        }, 500);

        setTimeout(() => {
            setCheckAlert(true);
        }, 2000)

        setTimeout(() => {
            setCheckAlert(false);
        }, 10000)
        dispatch(jurusanRecord());
    }

    const TabelJurusans = [
        { title: 'No.', short: true },
        { title: 'Kode Jurusan' },
        { title: 'Nama Jurusan' },
        { title: 'Action' },
    ];

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
                                <h1 className='text-xl md:text-2xl font-semibold '>Data Jurusan
                                    <button
                                        className=' py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-green-600 hover:bg-green-500 text-white rounded-md uppercase md:text-sm'
                                        onClick={() => setShowModalCreate(prev => prev = true)}
                                    >Tambah</button>
                                </h1>
                                <p>Kelola Data Jurusan</p>
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
                                            {TabelJurusans.map((tabel, i) => (
                                                <th
                                                    className={`p-3 text-sm 
                                        font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>

                                        {dataJurusan.items && dataJurusan?.items.map((jurusan, i) => (
                                            <tr key={i} className={`bg-white`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{i + 1}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{jurusan.kode_jurusan ? jurusan?.kode_jurusan : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{jurusan.nama_jurusan ? jurusan?.nama_jurusan : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                                            onClick={() => handleUpdate(jurusan?.id)}

                                                        >
                                                            <BiEdit className='inline' />
                                                        </button>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                                            onClick={() => handleDelete(jurusan?.id)}
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