import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEditKelas, kelasEdit, kelasRecord, kelasUpdate, pendingKelas } from '../../../features/dashboard/KelasSlice';


const ModalUpdate = ({ isVisible, idUser, onClose }) => {
    const dispatch = useDispatch();
    const [inputEdit, setInputEdit] = useState({
        nama_kelas: '',
        level: '',
    });
    const [errorData, setErrorData] = useState(null);
    const pending = useSelector(pendingKelas);
    const dataEditKelas = useSelector(checkEditKelas)
    useEffect(() => {
        isVisible && dispatch(kelasEdit(idUser));
    }, [dispatch, isVisible, idUser]);

    const handleChange = (e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClose = () => {
        onClose();
        setInputEdit({ nama_kelas: '', level: '' });
    }

    const handleEdit = () => {
        if (dataEditKelas.item) {
            setInputEdit({ nama_kelas: dataEditKelas.item.nama_kelas, level: dataEditKelas.item.level });
        }
        const data = {
            nama_kelas: inputEdit.nama_kelas,
            level: inputEdit.level,
            id: idUser,
        }
        dispatch(kelasUpdate(data));
        dispatch(kelasRecord());
        onClose();
    }

    console.log(inputEdit);
    return (
        <div>
            {isVisible && !pending && dataEditKelas?.item && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-2 rounded">
                        <div className="md:w-[600px] flex flex-col">
                            <div className="py-6 px-6 lg:px-8 text-left">
                                <h3 className="mb-5 text-xl font-medium text-gray-900">
                                    Edit Data
                                </h3>
                                <div className='space-x-6'>
                                    <div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nama_kelas">Nama Jurusan</label>
                                            <input
                                                type="text"
                                                name='nama_kelas'
                                                id='nama_kelas'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5`}
                                                placeholder='Nama Jurusan'
                                                onChange={handleChange}
                                                defaultValue={dataEditKelas?.item.nama_kelas}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kode_kelas">Kode Jurusan</label>
                                            <select
                                                id='level'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='level'
                                                name='level'
                                                defaultValue={dataEditKelas?.item.level}
                                                onChange={handleChange}
                                            >
                                                <option>{dataEditKelas?.item.level}</option>
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
                                        onClick={handleEdit}
                                    >
                                        Edit
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

export default ModalUpdate