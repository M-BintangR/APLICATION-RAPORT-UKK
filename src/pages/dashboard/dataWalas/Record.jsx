import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pendingWalas, selectAllWalas, walasDelete, walasRecord } from '../../../features/dashboard/WalasSlice';
import Alert from '../../../components/Alert';
import ModalCreate from './ModalCreate';
import ModalUpdate from './ModalUpdate';
import { BiTrash, BiEdit } from 'react-icons/bi';
import { useEffect } from 'react';


const Record = () => {
    const [active, setActive] = useState('Data Walas');
    const Menus = AdminMenu;
    const pending = useSelector(pendingWalas);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [checkAlert, setCheckAlert] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const dataWalas = useSelector(selectAllWalas);
    const dispatch = useDispatch();

    const handleUpdate = (id) => {
        setIdUser(id);
        setShowModalUpdate(prev => prev = true);
    }
    const handleDelete = (id) => {
        dispatch(walasDelete(id));
        setTimeout(() => {
            dispatch(walasRecord());
        }, 500);

        setTimeout(() => {
            setCheckAlert(true);
        }, 2000)

        setTimeout(() => {
            setCheckAlert(false);
        }, 10000)
        dispatch(walasRecord());
    }

    useEffect(() => {
        dispatch(walasRecord());
    }, [dispatch]);

    const TabelWalas = [
        { title: 'No.', short: true },
        { title: 'Nama Guru' },
        { title: 'Kelas' },
        { title: 'Action' }
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
                                <h1 className='text-xl md:text-2xl font-semibold '>Data Mapel
                                    <button
                                        className=' py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-green-600 hover:bg-green-500 text-white rounded-md uppercase md:text-sm'
                                        onClick={() => setShowModalCreate(prev => prev = true)}
                                    >Tambah</button>
                                </h1>
                                <p>Kelola Data Mapel</p>
                            </div>
                            <h1 className='text-lg md:text-xl pb-2 font-medium md:font-semibold md:my-2'>Record Data
                                <div className="float-right">
                                    <input className='p-1 rounded-md border shadow-sm border-sky-200 text-sm
                            w-[100px] md:w-[150px] bg-slate-100 focus:bg-slate-200 focus:outline-sky-200' type="text" placeholder='Search' />
                                </div>
                            </h1>
                            <div className="overflow-x-scroll mt-2 rounded-lg shadow mb-20">
                                <table className='w-full'>
                                    <thead className='bg-slate-900 text-white border-b-2 border-gray-200 py-1'>
                                        <tr >
                                            {TabelWalas.map((tabel, i) => (
                                                <th
                                                    className={`p-3 text-sm 
                                        font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>
                                        {dataWalas.item && dataWalas.item.map((walas, i) => (
                                            <tr key={i} className={`bg-white`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{i + 1}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{walas?.guru?.nama_guru ? walas?.guru?.nama_guru : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{walas.kelas.nama_kelas ? walas?.kelas?.nama_kelas : '-'}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                                            onClick={() => handleUpdate(walas?.id)}

                                                        >
                                                            <BiEdit className='inline' />
                                                        </button>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                                            onClick={() => handleDelete(walas?.id)}
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