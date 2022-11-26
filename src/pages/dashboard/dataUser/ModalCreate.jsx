import React from 'react';
import { useState } from 'react';

const ModalCreate = ({ isVisible, onClose }) => {
    const [inputCreate, setInputCreate] = useState({
        nama_pengguna: '',
        username: '',
        password: '',
    });
    const [errorData, setErrorData] = useState(null);


    const handleClose = () => {
        onClose();
    }

    const handleChange = (e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {

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
                                            <label className='mb-2' htmlFor="tahun_pelaran">Tahun Pelajaran</label>
                                            <div>
                                                {errorData?.tahun_pelajaran && (
                                                    errorData?.tahun_pelajaran.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='tahun_pelajaran'
                                                id='tahun_pelajaran'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.tahun_pelajaran ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Tahun Pelajaran'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="semester">Semester</label>
                                            <div>
                                                {errorData?.semester && (
                                                    errorData?.semester.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='semester'
                                                id='semester'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.semester ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Semester'
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="aktif">Aktif</label>
                                            <div>
                                                {errorData?.aktif && (
                                                    errorData?.aktif.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='aktif'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.aktif ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Aktif'
                                                name='aktif'
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih -</option>
                                                <option value={'1'}>Aktif</option>
                                                <option value={'0'}>Tidak Aktif</option>
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