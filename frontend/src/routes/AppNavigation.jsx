import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Homes from '../Screens/Homes';
import Project from '../Screens/Project';
import UserAuth from '../Screens/UserAuth'

function AppNavigation() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={
          // <UserAuth>
            <Homes/>
          //  </UserAuth> 
      }/>
        <Route path="/login" element= {<Login/>} />
        <Route path="/register" element={ <Register/> } />
        <Route path="/project/:id" element={ <Project/> } />
      </Routes>
    </div>
  </BrowserRouter>
  
  );
}

export default AppNavigation;
