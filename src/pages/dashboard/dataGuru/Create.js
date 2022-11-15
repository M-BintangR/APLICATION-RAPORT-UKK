import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapelRecord, selectAllMapel } from '../../../features/dashboard/MapelSlice';
import { createGuruCheck, guruCreate } from '../../../features/dashboard/GuruSlice';

const Create = () => {
    const Menus = AdminMenu;
    const dispatch = useDispatch();

    const mapels = useSelector(selectAllMapel);
    const check = useSelector(createGuruCheck);

    const [active, setActive] = useState('Data Guru');
    const [errorData, setErrorData] = useState(null);
    const navigate = useNavigate();
    const [inputGuru, setInputGuru] = useState({
        nama_guru: '',
        id_mapel: '',
    });


    useEffect(() => {
        dispatch(mapelRecord());
        if (check.response) setErrorData(check.response.data.errors);
    }, [dispatch, setErrorData, check]);

    const handleChange = e => {
        setInputGuru(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(guruCreate(inputGuru));
        navigate('/dashboard/data/guru');
        setInputGuru({ nama_guru: '', id_mapel: '' });
    }



    return (
        <div >
            <Sidebar Menus={Menus} title={'Tambah Data Guru'} active={active}>

                <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                    <h1 className='text-xl md:text-2xl font-semibold '>Tambah Data
                        <Link
                            to={'/dashboard/data/guru'}
                            className='py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-slate-800 hover:bg-slate-900 text-white rounded-md uppercase md:text-sm'
                        >Kembali
                        </Link>
                    </h1>
                    <p>Kelola Data Guru</p>
                </div>

                <div className="w-full mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-2 bg-slate-100 my-3 p-2 px-3 md:p-5 gap-x-3 rounded-md shadow-md shadow-slate-200 md:mb-10">
                    <div className="flex flex-col text-slate-900">
                        <div className="flex flex-col py-2 font-medium">
                            <label htmlFor="">Nama Guru</label>
                            {errorData && (
                                <small className='text-xs text-red-600'>{errorData?.nama_guru[0]}</small>
                            )}
                            <input
                                className={`rounded-lg bg-white mt-2 p-2 shadow-sm shadow-slate-200  focus:outline-sky-300 text-md text-slate-800 border border-spacing-4 border-sky-200 ${errorData && 'border-red-500'}`}
                                type="text"
                                placeholder='Nama Guru'
                                name='nama_guru'
                                value={inputGuru?.nama_guru}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col text-slate-900">
                        <div className="flex flex-col py-2 font-medium">
                            <label htmlFor="">Mapel</label>
                            {errorData && (
                                <small className='text-xs text-red-600'>{errorData?.id_mapel[0]}</small>
                            )}
                            {mapels.items && (
                                <select
                                    className={`rounded-lg bg-white mt-2 p-2 shadow-sm shadow-slate-200  focus:outline-none text-md text-slate-800 border border-spacing-4 border-sky-200 ${errorData && 'border-red-500'}`}
                                    type="text"
                                    placeholder='Mapel'
                                    name='id_mapel'
                                    value={inputGuru.id_mapel || ''}
                                    onChange={handleChange}
                                >
                                    <option>-Pilih Mapel Guru-</option>
                                    {mapels?.items.map((mapel, i) => (
                                        <option key={i} value={mapel?.id}>{mapel.nama_mapel}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="py-2 font-medium items-start justify-self-start">
                            <button
                                className='py-1 px-2 md:py-2 md:px-3 text-xs float-right bg-slate-800 hover:bg-slate-900 text-white rounded-md uppercase md:mt-2 md:text-sm'
                                onClick={handleClick}
                            >
                                Tambah
                            </button>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div >
    );
}

export default Create