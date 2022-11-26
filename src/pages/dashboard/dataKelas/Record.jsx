import React from 'react'
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { BiTrash, BiEdit } from 'react-icons/bi';
import ModalCreate from './ModalCreate';
import ModalUpdate from './ModalUpdate';
import Alert from '../../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { kelasDelete, kelasRecord, kelasSearch, pendingKelas, selectAllKelas } from '../../../features/dashboard/KelasSlice';
import { useEffect } from 'react';


const Record = () => {
    const [active, setActive] = useState('Data Kelas');
    const Menus = AdminMenu;
    const [checkAlert, setCheckAlert] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const pending = useSelector(pendingKelas);
    const dataKelas = useSelector(selectAllKelas);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(kelasRecord());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(kelasDelete(id));
        setTimeout(() => {
            dispatch(kelasRecord());
        }, 500);

        setTimeout(() => {
            setCheckAlert(true);
        }, 2000)

        setTimeout(() => {
            setCheckAlert(false);
        }, 10000)
        dispatch(kelasRecord());
    }

    const handleUpdate = (id) => {
        setIdUser(id);
        setShowModalUpdate(prev => prev = true);
    }

    const handleSearch = (e) => {
        dispatch(kelasSearch(e.target.value));
    }

    const TabelKelas = [
        { title: 'No.', short: true },
        { title: 'Nama Kelas' },
        { title: 'Level' },
        { title: 'Action' },
    ];
    return (
        <div >
            <Sidebar Menus={Menus} active={active}>
                <div>

                    {pending && (
                        <div className="flex flex-col justify-center items-center">
                            <div className="self-center mt-10 m-auto bg-amber-300 text-amber-800 p-2 rounded-md">Loading...</div>
                        </div>
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
                                            {TabelKelas.map((tabel, i) => (
                                                <th className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>
                                        {dataKelas.items && dataKelas?.items.map((kelas, i) => (
                                            <tr key={i} className={`bg-white`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{i + 1}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{kelas.nama_kelas ? kelas?.nama_kelas : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{kelas.level ? kelas?.level : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                                            onClick={() => handleUpdate(kelas?.id)}

                                                        >
                                                            <BiEdit className='inline' />
                                                        </button>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                                            onClick={() => handleDelete(kelas?.id)}
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