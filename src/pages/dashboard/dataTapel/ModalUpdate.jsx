import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEditTapel, checkUpdateTapel, pendingTapel, tapelEdit, tapelRecord, tapelUpdate } from '../../../features/dashboard/TapelSlice';

const ModalUpdate = ({ isVisible, onClose, idUser }) => {
    const dispatch = useDispatch();
    const dataEditTapel = useSelector(checkEditTapel);
    const pending = useSelector(pendingTapel);
    const check = useSelector(checkUpdateTapel);
    const [errorData, setErrorData] = useState(null);
    const [inputEdit, setInputEdit] = useState({
        tahun_pelajaran: '',
        semester: '',
        aktif: '',
    });

    useEffect(() => {
        isVisible && dispatch(tapelEdit(idUser));
    }, [dispatch, isVisible, idUser]);

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    const handleClose = useCallback(() => {
        onClose();
        setErrorData(null)
        setInputEdit({ tahun_pelajaran: '', semester: '', aktif: '' });
    }, [onClose]);

    useEffect(() => {
        if (dataEditTapel.item) {
            setInputEdit(dataEditTapel?.item);
        }
    }, [dataEditTapel]);

    const handleEdit = () => {
        const data = {
            tahun_pelajaran: inputEdit.tahun_pelajaran,
            semester: inputEdit.semester,
            aktif: inputEdit.aktif,
            id: idUser,
        }
        dispatch(tapelUpdate(data));
        dispatch(tapelRecord());
        setErrorData(null)
        onClose();
    }

    const handleChange = useCallback((e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    return (
        <div>
            {isVisible && !pending && dataEditTapel?.item && (
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
                                            <label className='mb-2' htmlFor="tahun_pelajaran">Tahun pelajaran</label>
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
                                                defaultValue={dataEditTapel?.item.tahun_pelajaran}
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
                                                defaultValue={dataEditTapel?.item.semester}
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
                                                defaultValue={dataEditTapel?.item.aktif}
                                                onChange={handleChange}
                                            >
                                                <option>{dataEditTapel?.item.aktif === 1 ? 'Aktif' : 'Tidak Aktif'}</option>
                                                <option value={'1'}>Aktif</option>
                                                <option value={'0'}>Tidak Aktif</option>
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