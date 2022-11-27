import React from 'react';
import { BsArrowLeftShort, BsChevronDown } from 'react-icons/bs';
import { RiDashboardFill, RiFolderUserFill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authenticated/logoutAuth';
import { selectUser } from '../features/authenticated/loginAuth';
import { useEffect } from 'react';
import { userSuccess } from '../features/authenticated/loginAuth';
import { FaAtom, FaBookOpen, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { IoMdSchool } from 'react-icons/io';

const Sidebar = (props) => {
    const [open, setOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const Menus = props.Menus;
    const active = props.active;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const users = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));


    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    useEffect(() => {
        dispatch(userSuccess({ token: token, users: users }));
    }, [token, users, dispatch]);

    return (
        <>
            <div className='fixed z-50 duration-300 bottom-0 left-0 top-0'>
                <div
                    className={`bg-dark-purple h-[100%] z-50 p-5 pt-8 duration-300 ${open ? 'w-72' : ' w-20 '} relative overflow-y-scroll scrollbar-hide`}
                >
                    <BsArrowLeftShort
                        className={`bg-white text-dark-purple text-3xl rounded-full absolute ${!open ? 'right-6' : 'right-3'} z-20 top-9 border border-dark-purple cursor-pointer duration-300 ${!open && 'rotate-180'}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div className="inline-flex mx-1">
                        <MdSchool
                            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-300 ${open && 'rotate-[360deg]'} ${!open && 'hidden'}`}
                        />
                        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Aplikasi Raport</h1>
                    </div>
                    <div className={`bg-light-with mt-2 p-2 rounded-md duration-300 ${open && 'rotate-[360deg]'} ${!open && 'hidden'}`}>
                        <h3 className='text-md font-medium text-white'>{user?.nama_pengguna}</h3>
                        <p className='text-sm text-white'>{user?.role}</p>
                    </div>
                    <ul className="pt-2">
                        {Menus.map((menu, index) => (
                            <div key={index}>
                                {menu.spacing && (
                                    <h2 className={`${menu.spacing && 'mt-5 mb-3'} font-medium text-xl gap-x-2 text-gray-200 duration-300 ${!open && 'scale-0'}`}>Kelola Data
                                    </h2>
                                )}
                                <Link to={menu?.link}
                                    onClick={() => setOpen(prev => prev = true)}
                                >
                                    <li
                                        className={`text-gray-300 text-sm flex items-center ${active === menu.title && 'bg-light-with'} gap-x-4 cursor-pointer p-2 hover:bg-light-with rounded-md mt-2`}
                                        onClick={() => setSubmenuOpen(!submenuOpen)}
                                    >
                                        <span className='text-2xl block float-left'>
                                            <>
                                                {menu?.title === 'Data Guru' && (
                                                    <FaChalkboardTeacher />
                                                )}
                                                {menu?.title === 'Dashboard' && (
                                                    <RiDashboardFill />
                                                )}
                                                {menu?.title === 'Data Tapel' && (
                                                    <BiTimeFive />
                                                )}
                                                {menu?.title === 'Data Mapel' && (
                                                    <FaBookOpen />
                                                )}
                                                {menu?.title === 'Data Siswa' && (
                                                    <IoMdSchool />
                                                )}
                                                {menu?.title === 'Data Walas' && (
                                                    <RiFolderUserFill />
                                                )}
                                                {menu?.title === 'Data Jurusan' && (
                                                    <FaAtom />
                                                )}
                                                {menu?.title === 'Data Kelas' && (
                                                    <FaSchool />
                                                )}
                                            </>
                                        </span>
                                        <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}
                                        </span>
                                        {menu.submenu && open && (
                                            <BsChevronDown className={`duration-300 ${!submenuOpen && 'rotate-180'}`} />
                                        )}
                                    </li>
                                </Link>

                                {menu.submenu && submenuOpen && open && (
                                    <ul className='my-2 space-y-1 flex flex-col'>
                                        {menu.submenuItems.map((submenu, index) => (
                                            <Link
                                                to={submenu.link}
                                                key={index}
                                            >
                                                <li className={`text-gray-300 text-sm flex ${active === submenu.title && 'bg-light-with'} items-center gap-x-4 cursor-pointer p-2 hover:bg-light-with rounded-md mx-5 duration-300`}
                                                    onClick={() => setOpen(prev => prev = true)}
                                                >
                                                    {submenu.title}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <nav className="w-full fixed bg-hard-purple shadow-2xl py-3">
                <div className={`text-gray-300 duration-300 ${open ? 'pl-80' : 'pl-28'} `}
                >

                    <div className={`capitalize text-sm md:text-lg ${open ? 'hidden md:block' : 'block'}`}>{user?.role}
                        <div
                            className='capitalize float-right top-0 mx-3 pb-2 mr-1 cursor-pointer'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user?.username}
                            <BsChevronDown className={`mt-1 mx-2 float-right duration-300 ${!dropdownOpen && 'rotate-180'} mt-2.3`} />
                        </div>
                    </div>
                    <div className="absolute  z-50 right-0 mx-3 max-w-sm bg-slate-200 rounded-md duration-300">
                        {dropdownOpen && (
                            <ul>
                                <li
                                    className={`text-dark-purple hover:text-red-600 text-sm flex items-center justify-between gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md duration-300 my-1 mx-1 bg-slate-300 w-32`}
                                    onClick={handleLogout}
                                >
                                    <div className="text-left font-medium ">
                                        Logout
                                    </div>
                                    <div className='text-right'>
                                        <FiLogOut className='float-right font-semibold' />
                                    </div>
                                </li>
                                <Link to={'/dashboard/profil'}>
                                    <li
                                        className={`text-dark-purple hover:text-green-600 text-sm flex items-center justify-between gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md duration-300 my-1 mx-1 bg-slate-300 w-32`}
                                    >
                                        <div className="text-left font-medium ">
                                            Profil
                                        </div>
                                        <div className='text-right'>
                                            <CgProfile
                                                className='float-right font-semibold' />
                                        </div>
                                    </li>
                                </Link>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <div className={`${open ? 'hidden md:block' : 'block'}`}>
                <div className={`duration-300 ${open ? 'pl-80' : 'pl-28'}`}>
                    <div className="pt-16 pr-7">
                        {props.children}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Sidebar