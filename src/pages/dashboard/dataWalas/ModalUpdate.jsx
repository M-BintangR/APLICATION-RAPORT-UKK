import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllGuru } from '../../../features/dashboard/GuruSlice';
import { selectAllKelas } from '../../../features/dashboard/KelasSlice';
import { checkEditWalas, checkUpdateWalas, pendingWalas, walasEdit, walasRecord, walasUpdate } from '../../../features/dashboard/WalasSlice';

const ModalUpdate = ({ isVisible, idUser, onClose }) => {
    const dispatch = useDispatch();
    const pending = useSelector(pendingWalas);
    const dataGuru = useSelector(selectAllGuru);
    const dataKelas = useSelector(selectAllKelas);
    const dataEditWalas = useSelector(checkEditWalas);
    const check = useSelector(checkUpdateWalas);
    const [errorData, setErrorData] = useState(null);
    const [inputEdit, setInputEdit] = useState({
        id_kelas: '',
        id_guru: '',
    });

    const handleClose = () => {
        onClose();
        setErrorData(null);
        setInputEdit({ id_guru: '', id_kelas: '' });
    }

    useEffect(() => {
        isVisible && dispatch(walasEdit(idUser));
    }, [dispatch, isVisible, idUser]);

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);


    const handleChange = (e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        if (dataEditWalas.item) {
            setInputEdit(dataEditWalas?.item);
        }
    }, [dataEditWalas]);

    const handleEdit = () => {
        const data = {
            id_kelas: inputEdit.id_kelas,
            id_guru: inputEdit.id_guru,
            id: idUser,
        }
        dispatch(walasUpdate(data));
        dispatch(walasRecord());
        setErrorData(null);
        onClose();
    }


    return (
        <div>
            {isVisible && dataKelas.items && !pending && dataGuru?.items && dataEditWalas?.item && (
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
                                            <label className='mb-2' htmlFor="kelas"> Kelas</label>
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
                                                onChange={handleChange}
                                                defaultValue={dataEditWalas?.item.id_kelas}
                                            >
                                                {dataKelas && dataKelas.items.map((kelas, i) => (
                                                    kelas.id === dataEditWalas.item.id_kelas && (
                                                        <option key={i} value={kelas.id}>
                                                            {kelas.level ? kelas?.level : '-'}
                                                            {kelas.nama_kelas ? kelas?.nama_kelas : '-'}
                                                        </option>
                                                    )
                                                ))}
                                                {dataKelas && dataKelas?.items.map((kelas, i) => (
                                                    <option key={i} value={kelas.id}>
                                                        {kelas.level ? kelas?.level : '-'}-
                                                        {kelas.nama_kelas ? kelas?.nama_kelas : '-'}
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
                                                onChange={handleChange}
                                                defaultValue={dataEditWalas?.item.id_kelas}
                                            >
                                                {dataGuru && dataGuru.items.map((guru, i) => (
                                                    guru.id === dataEditWalas.item.id_guru && (
                                                        <option key={i} value={guru.id}>{guru?.nama_guru}</option>
                                                    )
                                                ))}
                                                {dataGuru && dataGuru?.items.map((guru, i) => (
                                                    <option key={i} value={guru.id}>{guru?.nama_guru}</option>
                                                ))}

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