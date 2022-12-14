import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCreateJurusan, jurusanCreate, jurusanRecord } from '../../../features/dashboard/JurusanSlice';

const ModalCreate = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const [errorData, setErrorData] = useState(null);
    const [inputCreate, setInputCreate] = useState({
        kode_jurusan: '',
        nama_jurusan: '',
    });

    const check = useSelector(checkCreateJurusan);

    const handleChange = useCallback((e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleClick = () => {
        dispatch(jurusanCreate(inputCreate));
        onClose();
        setErrorData(null);
        setInputCreate({ nama_jurusan: '', kode_jurusan: '' });
        dispatch(jurusanRecord());
    }

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    const handleClose = useCallback(() => {
        setInputCreate({ nama_jurusan: '', kode_jurusan: '' });
        setErrorData(null);
        onClose();
    }, [onClose]);

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
                                            <label className='mb-2' htmlFor="nama_mapel">Nama Jurusan</label>
                                            <div>
                                                {errorData?.nama_jurusan && (
                                                    errorData?.nama_jurusan.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_jurusan'
                                                id='nama_jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.nama_jurusan ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Jurusan'
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kode_jurusan">Kode Jurusan</label>
                                            <div>
                                                {errorData?.kode_jurusan && (
                                                    errorData?.kode_jurusan.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='kode_jurusan'
                                                id='kode_jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.kode_jurusan ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Kode Jurusan'
                                                onChange={handleChange}
                                            />
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