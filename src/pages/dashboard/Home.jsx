import React from 'react';
import Sidebar from '../../components/Sidebar';
import { AdminMenu } from '../../components/Links';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeRecord, pendingHomeDashboard, selectAllHome } from '../../features/dashboard/HomeSlice';
import { IoMdSchool } from 'react-icons/io';
import { FaChalkboardTeacher, FaBookOpen, FaAtom, FaUserFriends, FaSchool } from 'react-icons/fa';

import { useEffect } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { RiFolderUserFill } from 'react-icons/ri';


const Home = () => {
    const [active, setActive] = useState('Home');
    const Menus = AdminMenu;
    const pending = useSelector(pendingHomeDashboard);
    const dataHome = useSelector(selectAllHome);
    const [jmlSiswa, setJmlSiswa] = useState(0);
    const [jmlGuru, setJmlGuru] = useState(0);
    const [jmlWalas, setJmlWalas] = useState(0);
    const [jmlKelas, setJmlKelas] = useState(0);
    const [jmlMapel, setJmlMapel] = useState(0);
    const [jmlTapel, setJmlTapel] = useState(0);
    const [jmlJurusan, setJmlJurusan] = useState(0);
    const [jmlUser, setJmlUser] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homeRecord());
    }, [dispatch]);

    const zeroToValue = (value, zero, target) => {
        if (value) {
            setTimeout(() => {
                let incremental = setInterval(() => {
                    if (zero >= value) {
                        clearInterval(incremental);
                    } else {
                        target(zero + 1);
                        clearInterval(incremental);
                    }
                });
            }, 300);
        }
    }

    useEffect(() => {
        zeroToValue(dataHome.jmlSiswa, jmlSiswa, setJmlSiswa);
        zeroToValue(dataHome.jmlWalas, jmlWalas, setJmlWalas);
        zeroToValue(dataHome.jmlJurusan, jmlJurusan, setJmlJurusan);
        zeroToValue(dataHome.jmlMapel, jmlMapel, setJmlMapel);
        zeroToValue(dataHome.jmlKelas, jmlKelas, setJmlKelas);
        zeroToValue(dataHome.jmlTapel, jmlTapel, setJmlTapel);
        zeroToValue(dataHome.jmlUser, jmlUser, setJmlUser);
        zeroToValue(dataHome.jmlGuru, jmlGuru, setJmlGuru);
    });

    return (
        <div>
            <Sidebar Menus={Menus} title={'Home Page'} active={active}>
                <div>
                    {pending && (
                        <div className="flex flex-col justify-center items-center">
                            <div className="self-center mt-10 m-auto bg-amber-300 text-amber-800 p-2 rounded-md">Loading...</div>
                        </div>
                    )}

                    {!pending && (
                        <div>
                            <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                                <h1 className='text-xl md:text-2xl font-semibold '>Dashboard Admin</h1>
                                <p>Hi Selamat Datang Admin!</p>
                            </div>

                            <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-indigo-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <IoMdSchool className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data siswa</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlSiswa}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-fuchsia-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <FaChalkboardTeacher className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Guru</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlGuru}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-blue-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <RiFolderUserFill className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Walas</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlWalas}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-violet-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <FaSchool className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Kelas</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlKelas}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-cyan-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <BiTimeFive className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Tapel</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlTapel}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-emerald-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <FaAtom className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Jurusan</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlJurusan}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-rose-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <FaBookOpen className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data Mapel</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlMapel}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-3 flex justify-start rounded-md">
                                    <div className="flex justify-center">
                                        <div className="bg-pink-700 jutify-self-start self-center text-white p-2 rounded-md mr-4">
                                            <FaUserFriends className='text-4xl' />
                                        </div>
                                        <div className="flex flex-col flex-wrap">
                                            <div className='font-medium text-base text-slate-400'>Data User</div>
                                            <div className='text-lg font-medium text-slate-600'>{jmlUser}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

            </Sidebar>
        </div >
    );
}

export default Home