import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEditGuru, guruEdit, guruPending, guruRecord, guruUpdate } from '../../../features/dashboard/GuruSlice';
import { selectAllMapel } from '../../../features/dashboard/MapelSlice';
import { useState } from 'react';

const ModalUpdate = ({ isVisible, onClose, idUser }) => {
    const Menus = AdminMenu;
    const dispatch = useDispatch();
    const dataEditGuru = useSelector(checkEditGuru);
    const pending = useSelector(guruPending);
    const dataMapel = useSelector(selectAllMapel);
    const [inputEdit, setInputEdit] = useState({
        id_mapel: '',
        nama_guru: '',
    });
    const checkShowModal = isVisible
        && dataEditGuru?.item
        && !pending && dataMapel.items;

    useEffect(() => {
        isVisible && dispatch(guruEdit(idUser));
    }, [dispatch, idUser, isVisible]);

    const handleClose = () => {
        onClose();
        setInputEdit({ nama_guru: '', id_mapel: '' });
    }

    const handleChange = (e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleEdit = () => {
        if (dataEditGuru.item.nama_guru && dataEditGuru.item.id_mapel) {
            setInputEdit({ nama_guru: dataEditGuru.item.nama_guru, id_mapel: dataEditGuru.item.id_mapel });
        }
        const data = {
            nama_guru: inputEdit.nama_guru,
            id_mapel: inputEdit.id_mapel,
            id: idUser,
        }
        dispatch(guruUpdate(data));
        dispatch(guruRecord());
        onClose();
    }

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

                                            </div>
                                            <input
                                                type="text"
                                                name='nama_guru'
                                                id='nama_guru'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5`}
                                                placeholder='Nama Guru'
                                                onChange={handleChange}
                                                defaultValue={dataEditGuru.item.nama_guru || inputEdit.nama_guru}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="id_mapel">Mapel</label>
                                            <div>

                                            </div>
                                            <select
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none `}
                                                type="text"
                                                placeholder='Mapel'
                                                name='id_mapel'
                                                onChange={handleChange}
                                                defaultValue={dataEditGuru.item.id_mapel || inputEdit.id_mapel}
                                            >
                                                {dataMapel?.items.map((mapel, i) => (
                                                    mapel.id === dataEditGuru.item.id_mapel && (
                                                        <option key={i} value={mapel.id}>{mapel.nama_mapel}</option>
                                                    )
                                                ))}
                                                {dataMapel?.items.map((mapel, i) => (
                                                    <option key={i} value={mapel.id}>{mapel.nama_mapel}</option>
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