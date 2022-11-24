import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { jurusanRecord, selectAllJurusan } from '../../../features/dashboard/JurusanSlice';
import { kelasRecord, selectAllKelas } from '../../../features/dashboard/KelasSlice';
import { checkCreateSiswa, siswaCreate, siswaRecord } from '../../../features/dashboard/SiswaSlice';
const ModalCreate = ({ isVisible, onClose }) => {
    const [errorData, setErrorData] = useState();
    const dispatch = useDispatch();
    const [inputCreate, setInputCreate] = useState({
        nis: '',
        nama: '',
        id_kelas: '',
        id_jurusan: '',
        jk: '',
        agama: '',
        nisn: '',
    });
    const dataJurusan = useSelector(selectAllJurusan);
    const dataKelas = useSelector(selectAllKelas);
    const check = useSelector(checkCreateSiswa);

    useEffect(() => {
        dispatch(jurusanRecord());
        dispatch(kelasRecord());
    }, [dispatch]);

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    const handleChange = (e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(siswaCreate(inputCreate));
        onClose();
        setErrorData(prev => prev = null);
        setInputCreate({ nis: '', nama: '', id_kelas: '', id_jurusan: '', jk: '', agama: '', nisn: '' });
        dispatch(siswaRecord());
    }
    const handleClose = () => {
        setErrorData(prev => prev = null);
        onClose();
    }
    return (
        <div>
            {isVisible && dataJurusan.items && dataKelas.items && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-2 rounded">
                        <div className="md:w-[600px] flex flex-col">
                            <div className="py-6 px-6 lg:px-8 text-left">
                                <h3 className="mb-5 text-xl font-medium text-gray-900">
                                    Tambah Data
                                </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                                    <div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nama">Nama</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.nama[0]}</small>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama'
                                                id='nama'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama'
                                                value={inputCreate?.nama}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nis">NIS</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.nis[0]}</small>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nis'
                                                id='nis'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='NIS'
                                                value={inputCreate?.nis}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nisn">NISN</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.nisn[0]}</small>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nisn'
                                                id='nisn'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='NISN'
                                                value={inputCreate?.nisn}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="agama">Agama</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.agama[0]}</small>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='agama'
                                                id='agama'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Agama'
                                                value={inputCreate?.agama}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jk">Jenis Kelamin</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.jk[0]}</small>
                                                )}
                                            </div>
                                            <select
                                                id='jk'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Jenis Kelamin'
                                                name='jk'
                                                value={inputCreate?.jk}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Jenis Kelamin -</option>
                                                <option value="L">Laki-Laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kelas">Kelas</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.id_kelas[0]}</small>
                                                )}
                                            </div>
                                            <select
                                                id='kelas'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Kelas'
                                                name='id_kelas'
                                                value={inputCreate?.id_kelas}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Kelas -</option>
                                                {dataKelas?.items.map((kelas, i) => (
                                                    <option key={i} value={kelas?.id}>{kelas?.nama_kelas}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jurusan">Jurusan</label>
                                            <div>
                                                {errorData && (
                                                    <small className='text-xs text-red-500 font-normal'>{errorData?.id_jurusan[0]}</small>
                                                )}
                                            </div>
                                            <select
                                                id='jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_jurusan'
                                                value={inputCreate?.id_jurusan}
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Jurusan -</option>
                                                {dataJurusan?.items.map((jurusan, i) => (
                                                    <option key={i} value={jurusan?.id}>{jurusan?.kode_jurusan}</option>
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