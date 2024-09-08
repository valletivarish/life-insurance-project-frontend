import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../sharedComponents/Navbar/Navbar';
import "./Layout.css"

const Layout = ({ role, setRole }) => {
  return (
    <div>
      <Navbar role={role} setRole={setRole}/> 
      <div className='main-content'>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
