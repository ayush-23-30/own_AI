import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';

function AppNavigation() {
  console.log('I am the navigation page');
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </div>
  </BrowserRouter>
  
  );
}

export default AppNavigation;
