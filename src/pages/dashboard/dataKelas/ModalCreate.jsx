import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCreateKelas, kelasCreate, kelasRecord } from '../../../features/dashboard/KelasSlice';

const ModalCreate = ({ isVisible, onClose }) => {
    const [errorData, setErrorData] = useState(null);
    const [inputCreate, setInputCreate] = useState({
        nama_kelas: '',
        level: '',
    });
    const check = useSelector(checkCreateKelas);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(kelasCreate(inputCreate));
        onClose();
        setErrorData(prev => prev = null);
        setInputCreate({ nama_kelas: '', level: '' });
        dispatch(kelasRecord());
    }

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    const handleClose = () => {
        onClose();
        setErrorData(prev => prev = null);
    }

    return (
        <div>
            {isVisible && (
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
                                            <label className='mb-2' htmlFor="nama_kelas">Nama Kelas</label>
                                            <div>
                                                {errorData && (
                                                    errorData?.nama_kelas.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_kelas'
                                                id='nama_kelas'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Kelas'
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="level">Level</label>
                                            <div>
                                                {errorData && (
                                                    errorData?.level.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='level'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='level'
                                                name='level'
                                                value={inputCreate?.level}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Level -</option>
                                                <option value={'X'}>X</option>
                                                <option value={'XI'}>XI</option>
                                                <option value={'XII'}>XII</option>
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