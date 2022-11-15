import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';

const Show = () => {
    const Menus = AdminMenu;
    return (
        <div >
            <Sidebar Menus={Menus}>
                <h1 className='text-2xl font-semibold'>Lihat Data Jurusan</h1>
            </Sidebar>
        </div >
    );
}

export default Show