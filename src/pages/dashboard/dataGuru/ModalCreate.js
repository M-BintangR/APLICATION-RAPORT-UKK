import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGuruCheck, guruCreate, guruRecord } from '../../../features/dashboard/GuruSlice';
import { selectAllMapel, mapelRecord } from '../../../features/dashboard/MapelSlice';

const ModalCreate = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const mapels = useSelector(selectAllMapel);
    const check = useSelector(createGuruCheck);
    const [errorData, setErrorData] = useState(null);
    const [inputGuru, setInputGuru] = useState({
        nama_guru: '',
        id_mapel: '',
    });

    useEffect(() => {
        dispatch(mapelRecord());
        if (check.response) setErrorData(check?.response.data.errors);
    }, [dispatch, setErrorData, check]);

    const handleChange = e => {
        setInputGuru(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(guruCreate(inputGuru));
        onClose();
        setErrorData(prev => prev = null);
        setInputGuru({ nama_guru: '', id_mapel: '' });
        dispatch(guruRecord());
    }

    const handleClose = () => {
        setErrorData(null);
        onClose();
    }

    return (
        <div>
            {isVisible && mapels.items && (
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
                                            <label className='mb-2' htmlFor="nama_guru">Nama Guru</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData.nama_guru[0]}</small>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_guru'
                                                id='nama_guru'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Guru'
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="id_mapel">Mapel</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData.nama_guru[0]}</small>
                                                )}
                                            </div>
                                            <select
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Mapel'
                                                name='id_mapel'
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option>-Pilih Mapel Guru-</option>
                                                {mapels?.items.map((mapel, i) => (
                                                    <option key={i} value={mapel?.id}>{mapel.nama_mapel}</option>
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
                                        onClick={handleClose}
                                        className='text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'
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
    )
}

export default ModalCreate