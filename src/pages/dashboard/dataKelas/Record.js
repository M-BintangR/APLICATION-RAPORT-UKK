import React from 'react'
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
const Record = () => {
    const [active, setActive] = useState('Data Kelas');
    const Menus = AdminMenu;
    return (
        <div >
            <Sidebar Menus={Menus} title={'Data Kelas'} active={active}>

            </Sidebar>
        </div >
    );
}

export default Record