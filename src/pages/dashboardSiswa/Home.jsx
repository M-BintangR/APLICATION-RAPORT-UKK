import React from 'react'
import Sidebar from '../../components/Sidebar';
import { SiswaMenu } from '../../components/Links';
import { useState } from 'react';

const Home = () => {
    const [active, setActive] = useState('Home');
    const Menus = SiswaMenu;
    return (
        <div>
            <Sidebar Menus={Menus} title={'Home Page'} active={active}>
                <div>
                    {/* {(
                        <div className="flex flex-col justify-center items-center">
                            <div className="self-center mt-10 m-auto bg-amber-300 text-amber-800 p-2 rounded-md">Loading...</div>
                        </div>
                    )} */}

                    {(
                        <div>
                            <div className="mt-5 mb-8 bg-slate-100 rounded-md py-3 px-4">
                                <h1 className='text-xl md:text-2xl font-semibold '>Dashboard Admin</h1>
                                <p>Hi Selamat Datang Siswa!</p>
                            </div>

                            <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            </div>

                        </div>
                    )}
                </div>

            </Sidebar>
        </div >
    )
}

export default Home