import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/pages/login/login.jsx";
import HomeAdmin from './components/pages/homeAdmin/homeAdmin.jsx';
import RegisterStud from './components/pages/registersStud/registerStud.jsx';
import LoginAdmin from './components/pages/loginAdminstrador/loginAdmin.jsx'

function RoutesComponent() {
    return (
        <div >
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/homeAdmin" element={<HomeAdmin/>}/>
                    <Route path="/registerStudent" element={<RegisterStud/>}/>
                    <Route path="/loginAdmin" element={<LoginAdmin/>}/>
                </Routes>
        </div>
    );
}

export default RoutesComponent;