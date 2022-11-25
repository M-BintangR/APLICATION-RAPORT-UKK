import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jurusanRecord, selectAllJurusan } from '../../../features/dashboard/JurusanSlice';
import { useState } from 'react';
import { checkCreateMapel, mapelCreate, mapelRecord } from '../../../features/dashboard/MapelSlice';

const Create = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const jurusans = useSelector(selectAllJurusan);
    const check = useSelector(checkCreateMapel);
    const [errorData, setErrorData] = useState(null);
    const [inputCreate, setInputCreate] = useState({
        nama_mapel: '',
        kkm: '',
        level: '',
        id_jurusan: '',
    });

    const handleChange = e => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(mapelCreate(inputCreate));
        onClose();
        setErrorData(null);
        setInputCreate({ nama_mapel: '', kkm: '', level: '', id_jurusan: '' });
        dispatch(mapelRecord());
    }

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    useEffect(() => {
        dispatch(jurusanRecord());
    }, [dispatch]);

    const handleClose = () => {
        setInputCreate({ nama_mapel: '', kkm: '', level: '', id_jurusan: '' });
        setErrorData(null);
        onClose();
    }

    return (
        <div>
            {isVisible && jurusans?.items && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-2 rounded">
                        <div className="md:w-[600px] flex flex-col">
                            <div className="py-6 px-6 lg:px-8 text-left">
                                <h3 className="mb-5 text-xl font-medium text-gray-900">
                                    Tambah Data
                                </h3>
                                <div className='space-x-6'>
                                    <div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nama_mapel">Nama Mapel</label>
                                            <div>
                                                {errorData?.nama_mapel && (
                                                    errorData?.nama_mapel.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_mapel'
                                                id='nama_mapel'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.nama_mapel ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Mapel'
                                                value={inputCreate?.nama_mapel}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kkm">Nilai KKM</label>
                                            <div>
                                                {errorData?.kkm && (
                                                    errorData?.kkm.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='kkm'
                                                id='kkm'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.kkm ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nilai KKM'
                                                value={inputCreate?.kkm}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="level">Level</label>
                                            <div>
                                                {errorData?.level && (
                                                    errorData?.level.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='level'
                                                id='level'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.level ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Level'
                                                value={inputCreate?.level}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jurusan">Jurusan</label>
                                            <div>
                                                {errorData?.id_jurusan && (
                                                    errorData?.id_jurusan.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.id_jurusan ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_jurusan'
                                                value={inputCreate?.id_jurusan}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Jurusan -</option>
                                                {jurusans?.items.map((jurusan, i) => (
                                                    <option key={i} value={jurusan?.id}>{jurusan?.kode_jurusan}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        className='text-white bg-dark-purple hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mr-2'
                                        onClick={handleClick}
                                    >
                                        Tambah
                                    </button>
                                    <button
                                        className='text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'
                                        onClick={handleClose}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Create