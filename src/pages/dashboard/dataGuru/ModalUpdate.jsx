import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEditGuru, checkUpdateGuru, guruEdit, guruPending, guruRecord, guruUpdate } from '../../../features/dashboard/GuruSlice';
import { selectAllMapel } from '../../../features/dashboard/MapelSlice';
import { useState } from 'react';
import { useCallback } from 'react';

const ModalUpdate = ({ isVisible, onClose, idUser }) => {
    const dispatch = useDispatch();
    const dataEditGuru = useSelector(checkEditGuru);
    const pending = useSelector(guruPending);
    const dataMapel = useSelector(selectAllMapel);
    const check = useSelector(checkUpdateGuru);
    const [errorData, setErrorData] = useState(null);
    const checkShowModal = isVisible
        && dataEditGuru.item
        && !pending && dataMapel.items;
    const [inputEdit, setInputEdit] = useState({
        id_mapel: '',
        nama_guru: '',
    });

    useEffect(() => {
        isVisible && dispatch(guruEdit(idUser));
    }, [dispatch, idUser, isVisible]);

    useEffect(() => {
        if (dataEditGuru.item) {
            setInputEdit(dataEditGuru?.item);
        }
    }, [dataEditGuru]);

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors);
    }, [check]);

    const handleChange = useCallback((e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleEdit = () => {
        const data = {
            nama_guru: inputEdit.nama_guru,
            id_mapel: inputEdit.id_mapel,
            id: idUser,
        }
        dispatch(guruUpdate(data));
        dispatch(guruRecord());
        onClose();
        setErrorData(null);
    }

    const handleClose = useCallback(() => {
        onClose();
        setErrorData(null);
        setInputEdit({ nama_guru: '', id_mapel: '' });
    }, [onClose]);

    return (
        <div>
            {checkShowModal && (
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
                                            <label className='mb-2' htmlFor="nama_guru">Nama Guru</label>
                                            <div>
                                                {errorData?.nama_guru && (
                                                    errorData?.nama_guru.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_guru'
                                                id='nama_guru'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.nama_guru ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Guru'
                                                onChange={handleChange}
                                                defaultValue={dataEditGuru?.item.nama_guru}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="id_mapel">Mapel</label>
                                            <div>
                                                {errorData?.id_mapel && (
                                                    errorData?.id_mapel.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.id_mapel ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Mapel'
                                                name='id_mapel'
                                                onChange={handleChange}
                                                defaultValue={dataEditGuru?.item.id_mapel}
                                            >
                                                {dataMapel.items && dataMapel?.items.map((mapel, i) => (
                                                    mapel.id === dataEditGuru?.item.id_mapel && (
                                                        <option key={i} value={mapel.id}>{mapel?.nama_mapel}</option>
                                                    )
                                                ))}
                                                {dataMapel.items && dataMapel.items.map((mapel, i) => (
                                                    <option key={i} value={mapel?.id}>{mapel?.nama_mapel}</option>
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

export default ModalUpdate;