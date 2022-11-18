import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit } from 'react-icons/bi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapelRecord, pendingMapel, selectAllMapel } from '../../../features/dashboard/MapelSlice';

const Record = () => {
    const [active, setActive] = useState('Data Mapel');
    const Menus = AdminMenu;
    const dispatch = useDispatch();
    const dataMapel = useSelector(selectAllMapel);
    const pending = useSelector(pendingMapel);

    useEffect(() => {
        dispatch(mapelRecord());
    }, [dispatch]);

    const TabelMapels = [
        { title: 'No.', short: true },
        { title: 'Nama Mapel' },
        { title: 'KKM' },
        { title: 'Level' },
        { title: 'Nama Jurusan' },
        { title: 'Kode Jurusan' },
        { title: 'Action' }
    ];

    console.log(dataMapel);
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
                                <h1 className='text-xl md:text-2xl font-semibold '>Data Guru
                                    <button
                                        className=' py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-green-600 hover:bg-green-500 text-white rounded-md uppercase md:text-sm'
                                    >Tambah</button>
                                </h1>
                                <p>Kelola Data Guru</p>
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
                                            {TabelMapels.map((tabel, i) => (
                                                <th
                                                    className={`p-3 text-sm 
                                            font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>
                                        {dataMapel.items && dataMapel.items.map((mapel, i) => (
                                            <tr key={i} className={`bg-white`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{i + 1}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{mapel.nama_mapel}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{mapel.kkm}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{mapel.level}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{mapel.jurusan.nama_jurusan}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{mapel.jurusan.kode_jurusan}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <Link
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-amber-400'

                                                        >
                                                            <BiEdit className='inline' />
                                                        </Link>
                                                        <button
                                                            className='text-sm md:text-xl text-black mr-1 bg-white font-medium md:font-semibold py-1 px-3 hover:text-red-400'

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

                    {/* {checkAlert && (
                    <Alert pesan={'Data berhasil dihapus'} />
                )} */}
                </div>
                {/* <ModalCreate isVisible={showModal} onClose={() => setShowModal(false)} />
            <ModalUpdate isVisible={showModalUpdate} onClose={() => setShowModalUpdate(false)} idUser={idUpdateModal} /> */}
            </Sidebar >
        </div >
    );
}

export default Record