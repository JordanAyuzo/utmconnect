import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/pages/login/login.jsx";
import HomeAdmin from './components/pages/homeAdmin/homeAdmin.jsx';
import RegisterStud from './components/pages/registersStud/registerStud.jsx';
import SettingStud from './components/pages/settingStud/settingStud.jsx';
import PageEmpresas from './components/pages/pageEmpresas/pageEmpresas.jsx';

function RoutesComponent() {
    return (
        <div >
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/homeAdmin" element={<HomeAdmin/>}/>
                    <Route path="/registerStudent" element={<RegisterStud/>}/>
                    <Route path="/settingsStudent" element={<SettingStud/>}/>
                    <Route path="/pageEmpresas" element={<PageEmpresas/>}/>
                </Routes>
        </div>
    );
}

export default RoutesComponent;