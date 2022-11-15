import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { AdminMenu } from '../../../components/Links';
import { useState } from 'react';
const Record = () => {
    const [active, setActive] = useState('Data Walas');
    const Menus = AdminMenu;
    return (
        <div >
            <Sidebar Menus={Menus} title={'Data Walas'} active={active}>

            </Sidebar>
        </div >
    );
}

export default Record