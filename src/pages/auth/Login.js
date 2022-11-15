import React from 'react';
import loginImage from '../../img/loginImage.jpg';
import { MdSchool } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsers, selectStatusUser } from '../../features/authenticated/loginAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatusUser);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const users = JSON.parse(localStorage.getItem("user"));


    const [loginInput, setLoginInput] = useState({
        username: '',
        password: '',
    });

    const handleInput = e => {
        setLoginInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = () => {
        try {
            const data = {
                username: loginInput.username,
                password: loginInput.password,
            };
            dispatch(loginUsers(data));
            setLoginInput({ username: '', password: '' });
        } catch (err) {

        }
    }

    useEffect(() => {
        if (token && users) {
            if (users.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [handleClick]);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
            <div className="hidden sm:block ">
                <img className='w-full h-full object-cover ' src={loginImage} alt="gambar login" />
            </div>

            <div className="bg-hard-purple flex flex-col justify-center">
                <div className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg dark:text-white font-bold ">
                    <div className="inline-flex mx-1 my-2 mb-3">
                        <MdSchool
                            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 text-slate-900 mt-2`}
                        />
                        <h1 className={`text-white origin-left font-medium text-xl`}>SIGN IN
                            <p className='text-sm font-medium block text-white origin-left'>Aplikasi Raport</p>
                        </h1>
                    </div>
                    <div className="flex flex-col text-gray-400 py-2 ">
                        <label htmlFor="">Username</label>
                        <input
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="text"
                            name="username"
                            value={loginInput?.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2 ">
                        <label htmlFor="">Password</label>
                        <input
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="password"
                            name='password'
                            value={loginInput?.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="flex justify-between text-gray-400 py-2 ">
                        <p className='flex items-center'>
                            <input className='mr-2' type="checkbox" />Remember Me
                        </p>
                        <p>Forgot Passowrd</p>
                    </div>
                    <button
                        type={`${status ? 'disable' : 'submit'}`}
                        className={`w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/10 rounded-lg hover:shadow-teal-500/50 text-white font-bold`}
                        onClick={handleClick}
                    >{status ? 'loading...' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login