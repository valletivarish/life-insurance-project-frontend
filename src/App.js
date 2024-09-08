import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import AgentDashboard from './components/AgentDashboard/AgentDashboard';
import { Container } from 'react-bootstrap';
import CustomerRegistration from './components/Registration/CustomerRegistration';
function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); 
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout role={role} setRole={setRole} />}>
        <Route index element={<Home />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        
        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="customer-dashboard" element={<CustomerDashboard />} />
        <Route path="agent-dashboard" element={<AgentDashboard />} />
      </Route>
      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/register" element={<CustomerRegistration  />}/>
    </Routes>
  );
}

export default App;
