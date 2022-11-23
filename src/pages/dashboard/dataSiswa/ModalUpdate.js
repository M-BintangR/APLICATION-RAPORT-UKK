import React from 'react';
import { useState } from 'react';
import { checkEditSiswa, pendingSiswa, siswaEdit, siswaRecord, siswaUpdate } from '../../../features/dashboard/SiswaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectAllKelas } from '../../../features/dashboard/KelasSlice';
import { selectAllJurusan } from '../../../features/dashboard/JurusanSlice';

const ModalUpdate = ({ isVisible, idUser, onClose }) => {
    const [inputEdit, setInputEdit] = useState({
        nis: '',
        nama: '',
        id_kelas: '',
        id_jurusan: '',
        jk: '',
        agama: '',
        nisn: '',
    })
    const dispatch = useDispatch();
    const dataEditSiswa = useSelector(checkEditSiswa);
    const dataKelas = useSelector(selectAllKelas);
    const dataJurusan = useSelector(selectAllJurusan);
    const pending = useSelector(pendingSiswa);

    useEffect(() => {
        isVisible && dispatch(siswaEdit(idUser));
    }, [dispatch, idUser, isVisible]);

    useEffect(() => {
        if (dataEditSiswa.item) {
            setInputEdit(dataEditSiswa?.item);
        }
    }, [dataEditSiswa]);

    const handleEdit = () => {
        const data = {
            nis: inputEdit.nis,
            nama: inputEdit.nama,
            id_kelas: inputEdit.id_kelas,
            id_jurusan: inputEdit.jurusan,
            jk: inputEdit.jk,
            agama: inputEdit.agama,
            nisn: inputEdit.nisn,
            id: idUser,
        }
        dispatch(siswaUpdate(data));
        dispatch(siswaRecord());
        onClose();
    }

    const handleChange = (e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClose = () => {
        onClose();
        setInputEdit({ nis: '', nama: '', id_kelas: '', id_jurusan: '', agama: '', jk: '', nisn: '' })
    }

    return (
        <div>
            {isVisible && dataJurusan.items && dataKelas.items && !pending && dataEditSiswa?.item && (
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
                                            <label className='mb-2' htmlFor="nama">Nama</label>
                                            <input
                                                type="text"
                                                name='nama'
                                                id='nama'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5`}
                                                placeholder='Nama Mapel'
                                                defaultValue={dataEditSiswa?.item.nama}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nis">NIS</label>
                                            <input
                                                type="text"
                                                name='nis'
                                                id='nis'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Nilai KKM'
                                                onChange={handleChange}
                                                defaultValue={dataEditSiswa?.item.nis}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="nisn">NISN</label>
                                            <input
                                                type="text"
                                                name='nisn'
                                                id='nisn'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Level'
                                                onChange={handleChange}
                                                defaultValue={dataEditSiswa?.item.nisn}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="agama">Agama</label>
                                            <input
                                                type="text"
                                                name='agama'
                                                id='agama'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 `}
                                                placeholder='Level'
                                                onChange={handleChange}
                                                defaultValue={dataEditSiswa?.item.agama}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jk">Jenis Kelamin</label>
                                            <select
                                                id='jk'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none `}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='jk'
                                                defaultValue={dataEditSiswa?.item.jk}
                                                onChange={handleChange}
                                            >
                                                {dataEditSiswa?.item.jk === "L" ?
                                                    <option value="L" >Laki-Laki</option> :
                                                    <option value="P">Perempuan</option>
                                                }
                                                <option value="L">Laki-Laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kelas">Kelas</label>
                                            <select
                                                id='kelas'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none `}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_kelas'
                                                onChange={handleChange}
                                                defaultValue={dataEditSiswa?.item.id_kelas}
                                            >
                                                {dataKelas.items && dataKelas.items.map((kelas, i) => (
                                                    kelas.id === dataEditSiswa?.item.id_kelas && (
                                                        <option key={i} value={kelas?.id}>{kelas?.nama_kelas}</option>
                                                    )
                                                ))}
                                                {dataKelas.items && dataKelas?.items.map((kelas, i) => (
                                                    <option key={i} value={kelas?.id}>{kelas?.nama_kelas}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jurusan">Jurusan</label>
                                            <select
                                                id='jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none `}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_jurusan'
                                                onChange={handleChange}
                                                defaultValue={dataEditSiswa?.item.id_jurusan}
                                            >
                                                {dataJurusan.items && dataJurusan.items.map((jurusan, i) => (
                                                    jurusan.id === dataEditSiswa?.item.id_jurusan && (
                                                        <option key={i} value={jurusan?.id}>{jurusan?.kode_jurusan}</option>
                                                    )
                                                ))}
                                                {dataJurusan.items && dataJurusan?.items.map((jurusan, i) => (
                                                    <option key={i} value={jurusan?.id}>{jurusan?.kode_jurusan}</option>
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