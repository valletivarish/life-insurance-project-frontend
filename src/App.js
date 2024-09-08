import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import AgentDashboard from './components/AgentDashboard/AgentDashboard';
import CustomerRegistration from './components/Registration/CustomerRegistration';
import AddAgent from './components/AdminDashboard/adminComponents/AddAgent/AddAgent';
import ViewAgents from './components/AdminDashboard/adminComponents/viewAgents/ViewAgents';
import EditAgentForm from './components/AdminDashboard/adminComponents/viewAgents/EditAgentForm';
import { getStoredRole } from './utils/helpers/Helper';
import CommissionView from './components/AdminDashboard/adminComponents/Commissions/CommissionView';
import CommissionWithdrawals from './components/AdminDashboard/adminComponents/Commissions/CommissionWithdrawals';
import TaxSetting from './components/AdminDashboard/adminComponents/Settings/TaxSetting/TaxSetting';
import InsuranceSetting from './components/AdminDashboard/adminComponents/Settings/InsuranceSetting/InsuranceSetting';
import ViewStates from './components/AdminDashboard/adminComponents/Settings/States/ViewStates';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = getStoredRole();
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout role={role} setRole={setRole} />}>
        <Route index element={<Home />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="agents/add" element={<AddAgent />} />
        <Route path="agents/view" element={<ViewAgents />} />
        <Route path="/agents/edit/:agentId" element={<EditAgentForm />} />
        <Route path="/commissions" element={<CommissionView />} /> 
        <Route path="/commissions-withdrawals" element={<CommissionWithdrawals />} /> 
        <Route path="/settings/tax" element={<TaxSetting />} />
         <Route path="/settings/insurance" element={<InsuranceSetting /> }/>
      <Route path="/settings/states/view" element={<ViewStates />} />
{/*       
        <Route path="/settings/cities/add" element={<AddCity />} />
        <Route path="/settings/cities/view" element={<ViewCities />} />   */}

        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="customer-dashboard" element={<CustomerDashboard />} />
        <Route path="agent-dashboard" element={<AgentDashboard />} />
      </Route>
      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/register" element={<CustomerRegistration />} />
    </Routes>
  );
}

export default App;
