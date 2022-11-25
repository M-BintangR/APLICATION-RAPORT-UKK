import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEditMapel, checkUpdateMapel, mapelEdit, mapelRecord, mapelUpdate, pendingMapel } from '../../../features/dashboard/MapelSlice';
import { selectAllJurusan } from '../../../features/dashboard/JurusanSlice';
import { useEffect } from 'react';

const ModalUpdate = ({ isVisible, onClose, idUser }) => {
    const dispatch = useDispatch();
    const pending = useSelector(pendingMapel);
    const dataEditMapel = useSelector(checkEditMapel);
    const dataJurusan = useSelector(selectAllJurusan);
    const check = useSelector(checkUpdateMapel);
    const [errorData, setErrorData] = useState(null);
    const [inputEdit, setInputEdit] = useState({
        nama_mapel: '',
        kkm: '',
        level: '',
        id_jurusan: '',
    });

    const handleClose = () => {
        onClose();
        setErrorData(null);
        setInputEdit({ nama_mapel: '', kkm: '', level: '', id_jurusan: '' });
    }

    useEffect(() => {
        isVisible && dispatch(mapelEdit(idUser));
    }, [dispatch, isVisible, idUser]);

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors)
    }, [check]);

    useEffect(() => {
        if (dataEditMapel.item) {
            setInputEdit(dataEditMapel?.item);
        }
    }, [dataEditMapel]);

    const handleEdit = () => {
        const data = {
            nama_mapel: inputEdit.nama_mapel,
            level: inputEdit.level,
            kkm: inputEdit.kkm,
            id_jurusan: inputEdit.id_jurusan,
            id: idUser,
        }
        dispatch(mapelUpdate(data));
        dispatch(mapelRecord());
        setErrorData(null);
        onClose();
    }

    const handleChange = (e) => {
        setInputEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }


    return (
        <div>
            {isVisible && dataJurusan?.items && !pending && dataEditMapel?.item && (
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
                                            <label className='mb-2' htmlFor="nama_mapel">Nama Mapel</label>
                                            <div>
                                                {errorData?.nama_mapel && (
                                                    errorData?.nama_mapel.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_mapel'
                                                id='nama_mapel'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.nama_mapel ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Mapel'
                                                defaultValue={dataEditMapel?.item.nama_mapel}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="kkm">Nilai KKM</label>
                                            <div>
                                                {errorData?.kkm && (
                                                    errorData?.kkm.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='kkm'
                                                id='kkm'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.kkm ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nilai KKM'
                                                onChange={handleChange}
                                                defaultValue={dataEditMapel?.item.kkm}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="level">Level</label>
                                            <div>
                                                {errorData?.level && (
                                                    errorData?.level.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='level'
                                                id='level'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.level ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Level'
                                                onChange={handleChange}
                                                defaultValue={dataEditMapel?.item.level}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="jurusan">Jurusan</label>
                                            <div>
                                                {errorData?.id_jurusan && (
                                                    errorData?.id_jurusan.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='jurusan'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.id_jurusan ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Jurusan'
                                                name='id_jurusan'
                                                onChange={handleChange}
                                                defaultValue={dataEditMapel?.item.id_jurusan}
                                            >
                                                {dataJurusan && dataJurusan.items.map((jurusan, i) => (
                                                    jurusan.id === dataEditMapel.item.id_jurusan && (
                                                        <option key={i} value={jurusan?.id}>{jurusan?.kode_jurusan}</option>
                                                    )
                                                ))}
                                                {dataJurusan && dataJurusan?.items.map((jurusan, i) => (
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