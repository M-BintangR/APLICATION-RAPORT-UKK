import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guruRecord, selectAllGuru } from '../../../features/dashboard/GuruSlice';
import { kelasRecord, selectAllKelas } from '../../../features/dashboard/KelasSlice';
import { checkCreateWalas, walasCreate, walasRecord } from '../../../features/dashboard/WalasSlice';

const ModalCreate = ({ isVisible, onClose }) => {
    const [errorData, setErrorData] = useState();
    const [inputCreate, setInputCreate] = useState({
        id_guru: '',
        id_kelas: '',
    });
    const dataGuru = useSelector(selectAllGuru);
    const dataKelas = useSelector(selectAllKelas);
    const dispatch = useDispatch();
    const check = useSelector(checkCreateWalas);

    const handleClose = () => {
        setInputCreate({ id_guru: '', id_kelas: '' });
        onClose();
        setErrorData(null);
    }

    const handleChange = (e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    useEffect(() => {
        dispatch(walasRecord());
        dispatch(kelasRecord());
        dispatch(guruRecord());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(walasCreate(inputCreate));
        onClose();
        setErrorData(null);
        setInputCreate({ id_guru: '', id_kelas: '' });
        dispatch(walasRecord());
    }


    return (
        <div>
            {isVisible && dataGuru.items && dataKelas.items && (
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
                                            <label className='mb-2' htmlFor="kelas">Kelas</label>
                                            <div>
                                                {errorData?.id_kelas && (
                                                    errorData?.id_kelas.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='kelas'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.id_kelas ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Kelas'
                                                name='id_kelas'
                                                value={inputCreate?.id_kelas}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Kelas -</option>
                                                {dataKelas?.items.map((kelas, i) => (
                                                    <option key={i} value={kelas?.id}>
                                                        <span className='mr-1'>
                                                            {kelas.level ? kelas?.level : '-'}-
                                                        </span>
                                                        <span>
                                                            {kelas.nama_kelas ? kelas?.nama_kelas : '-'}
                                                        </span>
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="guru">Nama Guru</label>
                                            <div>
                                                {errorData?.id_guru && (
                                                    errorData?.id_guru.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='guru'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Nama Guru'
                                                name='id_guru'
                                                value={inputCreate?.id_guru}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Guru -</option>
                                                {dataGuru?.items.map((guru, i) => (
                                                    <option key={i} value={guru?.id}>{guru?.nama_guru}</option>
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

export default ModalCreate