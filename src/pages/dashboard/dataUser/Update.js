import React from 'react'
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';

const Update = () => {
    const Menus = AdminMenu;
    return (
        <div >
            <Sidebar Menus={Menus}>
                <h1 className='text-2xl font-semibold'>Edit Data User</h1>
            </Sidebar>
        </div >
    );
}

export default Update