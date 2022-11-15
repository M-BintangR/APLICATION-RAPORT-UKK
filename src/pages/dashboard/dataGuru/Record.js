import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guruDelete, guruPending, guruRecord } from '../../../features/dashboard/GuruSlice';
import { selectAllGuru } from '../../../features/dashboard/GuruSlice';
import Alert from '../../../components/Alert';

const Record = () => {
    const [active, setActive] = useState('Data Guru');
    const Menus = AdminMenu;
    const dispatch = useDispatch();
    const dataGuru = useSelector(selectAllGuru);
    const dataGuruCheck = useSelector(guruPending);
    const [checkAlert, setCheckAlert] = useState(false);

    const handleDelete = (id) => {
        dispatch(guruDelete(id));
        setTimeout(() => {
            dispatch(guruRecord());
        }, 500);

        setTimeout(() => {
            setCheckAlert(true);
        }, 2000)

        setTimeout(() => {
            setCheckAlert(false);
        }, 10000)
    }

    useEffect(() => {
        dispatch(guruRecord());
    }, [dispatch]);


    const TabelGurus = [
        { title: 'No.', short: true },
        { title: 'Nama Guru' },
        { title: 'Mapel' },
        { title: 'KKM' },
        { title: 'Level' },
        { title: 'Action' }
    ];


    return (
        <div >
            <Sidebar Menus={Menus} active={active}>
                <div>
                    {dataGuruCheck && (
                        <div className="flex flex-col justify-center items-center">
                            <div className="self-center mt-10 m-auto bg-amber-300 text-amber-800 p-2 rounded-md">Loading...</div>
                        </div>
                    )}

                    {!dataGuruCheck && (
                        <div>
                            <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                                <h1 className='text-xl md:text-2xl font-semibold '>Data Guru
                                    <Link to={'/dashboard/data/guru/create'} className=' py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-green-600 hover:bg-green-500 text-white rounded-md uppercase md:text-sm'>Tambah</Link>
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
                                            {TabelGurus.map((tabel, i) => (
                                                <th
                                                    className={`p-3 text-sm 
                                                font-normal md:font-semibold tracking-wide text-left ${tabel?.short && 'w-3'}`}
                                                    key={i}
                                                >{tabel?.title}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100 '>
                                        {dataGuru.items && dataGuru.items.map((data, i) => (
                                            < tr key={i} className={`bg-white ${'data-' + data.id}`} >
                                                <>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{data.id}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{data?.nama_guru}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{data?.mapel.nama_mapel}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>{data?.mapel.kkm}</td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>
                                                            {data?.mapel.level}
                                                        </span>
                                                    </td>
                                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm'>
                                                        <Link
                                                            className='text-xs md:text-sm text-white mr-1 font-medium md:font-semibold bg-amber-500 rounded-md uppercase py-1 px-3 hover:bg-amber-400'
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            className='text-xs md:text-sm text-white mr-1 font-medium md:font-semibold bg-cyan-500 rounded-md uppercase py-1 hover:bg-cyan-400  px-3'
                                                        >
                                                            Lihat
                                                        </Link>
                                                        <button
                                                            className='text-xs md:text-sm text-white mr-1 font-medium md:font-semibold bg-rose-500 hover:bg-rose-400 rounded-md uppercase py-1 px-3'
                                                            onClick={() => handleDelete(data.id)}
                                                        >
                                                            Hapus
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
            </Sidebar >
        </div >
    );
}

export default Record