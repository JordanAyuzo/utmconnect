import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/pages/login/login.jsx";


function RoutesComponent() {
    return (
        <div >
                <Routes>
                    <Route path="/" element={<Login/>}/>
                </Routes>
        </div>
    );
}

export default RoutesComponent;