import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCreateUser, userCreate, userRecord } from '../../../features/dashboard/UserSlice';

const ModalCreate = ({ isVisible, onClose }) => {
    const check = useSelector(checkCreateUser);
    const [errorData, setErrorData] = useState(null);
    const dispatch = useDispatch();
    const [inputCreate, setInputCreate] = useState({
        nama_pengguna: '',
        username: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        if (check.response) setErrorData(check?.response.data.errors);
    }, [check]);


    const handleClose = () => {
        setInputCreate({ nama_pengguna: '', username: '', password: '', role: '' });
        onClose();
        setErrorData(null);
    }

    const handleChange = (e) => {
        setInputCreate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        dispatch(userCreate(inputCreate));
        onClose();
        setErrorData(null);
        setInputCreate({ nama_pengguna: '', username: '', password: '', role: '' });
        dispatch(userRecord());
    }

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
                                            <label className='mb-2' htmlFor="nama_pengguna">Nama Pengguna</label>
                                            <div>
                                                {errorData?.nama_pengguna && (
                                                    errorData?.nama_pengguna.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='nama_pengguna'
                                                id='nama_pengguna'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.nama_pengguna ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Nama Pengguna'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="username">Username</label>
                                            <div>
                                                {errorData?.username && (
                                                    errorData?.username.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                name='username'
                                                id='username'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.username ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Username'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="role">Role</label>
                                            <div>
                                                {errorData?.role && (
                                                    errorData?.role.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <select
                                                id='role'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none ${errorData?.role ? 'border-red-500' : 'border-gray-300'}`}
                                                type="text"
                                                placeholder='Role'
                                                name='role'
                                                onChange={handleChange}
                                            >
                                                <option>- Pilih Role -</option>
                                                <option value={'Guru'}>Guru</option>
                                                <option value={'Walas'}>Walas</option>
                                                <option value={'Siswa'}>Siswa</option>
                                                <option value={'Admin'}>Admin</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="password">Password</label>
                                            <div>
                                                {errorData?.password && (
                                                    errorData?.password.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="password"
                                                name='password'
                                                id='password'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.password ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Password'
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