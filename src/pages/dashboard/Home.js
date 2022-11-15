import React from 'react';
import Sidebar from '../../components/Sidebar';
import { AdminMenu } from '../../components/Links';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


const Home = () => {
    const [active, setActive] = useState('Home');
    const Menus = AdminMenu;


    return (
        <div >
            <Sidebar Menus={Menus} title={'Home Page'} active={active}>


            </Sidebar>
        </div >
    );
}

export default Home