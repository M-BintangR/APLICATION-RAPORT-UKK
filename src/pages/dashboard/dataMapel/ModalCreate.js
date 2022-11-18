import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jurusanRecord, selectAllJurusan } from '../../../features/dashboard/JurusanSlice';

const Create = ({ isVisible, onClose }) => {
    const Menus = AdminMenu;
    const dispatch = useDispatch();
    const jurusans = useSelector(selectAllJurusan);

    useEffect(() => {
        dispatch(jurusanRecord());
    }, [dispatch]);

    const handleClose = () => {
        onClose();
    }

    console.log(jurusans);

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
                                            <label className='mb-2' htmlFor="nama_mapel">Nama Mapel</label>
                                            <div>
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_mapel'
                                                id='nama_mapel'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Nama Mapel'

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kkm">Nilai KKM</label>
                                            <div>

                                            </div>
                                            <input
                                                type="text"
                                                name='kkm'
                                                id='kkm'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Nilai KKM'
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="level">Level</label>
                                            <div>

                                            </div>
                                            <input
                                                type="text"
                                                name='level'
                                                id='level'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Level'
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jurusan">Jurusan</label>
                                            <div>

                                            </div>
                                            <select
                                                id='jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none `}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_jurusan'
                                            >
                                                <option selected>- Pilih Jurusan -</option>
                                                {jurusans.items.map((jurusan, i) => (
                                                    <option key={i} value={jurusan.id}>{jurusan.kode_jurusan}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        className='text-white bg-dark-purple hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mr-2'
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

export default Create