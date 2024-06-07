import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/pages/login/login.jsx";
import HomeAdmin from './components/pages/homeAdmin/homeAdmin.jsx';
import HomeStud from './components/pages/homeStudent/homeStud.jsx';
import RegisterStud from './components/pages/registersStud/registerStud.jsx';
import RegisterAdmin from './components/pages/registerAdmin/registerAdmin.jsx';
import SettingStud from './components/pages/settingStud/settingStud.jsx';
import SettingsAdmin from './components/pages/settingsAdmin/settingsAdmin.jsx';
import PageEmpresas from './components/pages/pageEmpresas/pageEmpresas.jsx';
import RegisterEmpresa from './components/pages/registerEmpresas/registerEmpresa.jsx';
import PageVacantes from './components/pages/pageVacantes/pageVacantes.jsx';
import HomeEmpresa from './components/pages/homEmpresa/homeEmpresa.jsx';
import SettingsEmpresa from './components/pages/settingsEmpresa/settingsEmpresa.jsx';

function RoutesComponent() {
    return (
        <div >
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/homeAdmin" element={<HomeAdmin/>}/>
                    <Route path="/homestudent" element={<HomeStud/>}/>
                    <Route path="/registerStudent" element={<RegisterStud/>}/>
                    <Route path="/registerAdmin" element={<RegisterAdmin/>}/>
                    <Route path="/settingsStudent" element={<SettingStud/>}/>
                    <Route path="/settingsEmpresa" element={<SettingsEmpresa/>}/>
                    <Route path="/settingsAdmin" element={<SettingsAdmin/>}/>
                    <Route path="/pageEmpresas" element={<PageEmpresas/>}/>
                    <Route path="/registerEmpresa" element={<RegisterEmpresa/>}/>
                    <Route path="/pageVacantes" element={<PageVacantes/>}/>
                    <Route path="/homeEmpresa" element={<HomeEmpresa/>}/>
                </Routes>
        </div>
    );
}

export default RoutesComponent;