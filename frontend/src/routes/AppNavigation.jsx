import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Homes from '../Screens/Homes';

function AppNavigation() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Homes/>}/>
        <Route path="/login" element= {<Login/>} />
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </div>
  </BrowserRouter>
  
  );
}

export default AppNavigation;
