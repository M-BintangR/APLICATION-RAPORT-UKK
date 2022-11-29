import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAkunUser } from '../../features/authenticated/loginAuth';
import { checkResetPassword, resetPassword } from '../../features/dashboard/UserSlice';


const ResetPassword = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const check = useSelector(checkResetPassword);
    const akun = useSelector(selectAkunUser);
    const [errorData, setErrorData] = useState(null);
    const [inputReset, setInputReset] = useState({
        password: '',
        password_baru: '',
    });

    useEffect(() => {
        if (check?.response) setErrorData(check?.response.data.errors)
    }, [check]);

    const handleChange = (e) => {
        setInputReset(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClose = () => {
        setInputReset({ password: '', password_baru: '' });
        setErrorData(null);
        onClose();
    }

    const handleClick = () => {
        const data = {
            password: inputReset?.password,
            password_baru: inputReset?.password_baru,
            id: akun?.id
        }
        dispatch(resetPassword(data));
        onClose();
        setInputReset({ password: '', password_baru: '' });
        setErrorData(null);
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
                                            <label className='mb-2' htmlFor="password">Password Lama</label>
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
                                                placeholder='Password Lama'
                                                defaultValue={inputReset?.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='mb-2' htmlFor="password_baru">Password Baru</label>
                                            <div>
                                                {errorData?.password_baru && (
                                                    errorData?.password_baru.map((error) => (
                                                        <small className='text-xs text-red-500 font-normal'>{error}</small>
                                                    ))
                                                )}
                                            </div>
                                            <input
                                                type="password_baru"
                                                name='password_baru'
                                                id='password_baru'
                                                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 ${errorData?.password_baru ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder='Password Baru'
                                                defaultValue={inputReset?.password_baru}
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
                                        Reset
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
    )
}

export default ResetPassword