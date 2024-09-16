import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import AgentDashboard from "./components/AgentDashboard/AgentDashboard";
import CustomerRegistration from "./components/Registration/CustomerRegistration";
import AddAgent from "./components/Agents/AddAgent/AddAgent";
import ViewAgents from "./components/Agents/viewAgents/ViewAgents";
import EditAgentForm from "./components/Agents/viewAgents/EditAgentForm";
import CommissionView from "./components/Commissions/CommissionView";
import CommissionWithdrawals from "./components/Commissions/CommissionWithdrawals";
import TaxSetting from "./components/AdminDashboard/adminComponents/Settings/TaxSetting/TaxSetting";
import InsuranceSetting from "./components/AdminDashboard/adminComponents/Settings/InsuranceSetting/InsuranceSetting";
import ViewStates from "./components/AdminDashboard/adminComponents/Settings/States/ViewStates";
import EditState from "./components/AdminDashboard/adminComponents/Settings/States/EditState";
import ViewCities from "./components/AdminDashboard/adminComponents/Settings/Cities/ViewCities";
import AddEmployee from "../src/components/AdminDashboard/adminComponents/Employees/AddEmployee";
import AddPlan from "./components/AdminDashboard/adminComponents/Plans/AddPlan";
import ViewPlan from "./components/AdminDashboard/adminComponents/Plans/ViewPlan";
import EditPlan from "./components/AdminDashboard/adminComponents/Plans/EditPlan";
import AddScheme from "./components/AdminDashboard/adminComponents/Plans/AddScheme";
import ViewSchemes from "./components/AdminDashboard/adminComponents/Plans/ViewSchemes";
import SchemeDetails from "./components/AdminDashboard/adminComponents/Plans/SchemeDetails";
import ViewCustomers from "./components/Customers/ViewCustomers";
import { Helper } from "./utils/helpers/Helper";
import "./App.css";
import ViewPolicies from "./components/Policies/ViewPolicies";
import ViewPayment from "./components/Policies/ViewPayment";
import ViewClaims from "./components/Policies/ViewClaims";
import ViewEmployees from "./components/Employees/ViewEmployees";
import EditEmployeeForm from "./components/Employees/EditEmployeeForm";
import ViewQueries from "./components/Queries/ViewQueries";
import ViewDocuments from "./components/Documents/ViewDocuments";
import SchemePage from "../src/components/CustomerDashboard/customerComponents/Insurance/SchemePage";
import SuccessPage from "./components/PaymentPages/SuccessPage";
import CancelPage from "./components/PaymentPages/CancelPage";
import PolicyPage from "../src/components/CustomerDashboard/customerComponents/Policies/PolicyPage";
import PolicyDetailPage from "../src/components/CustomerDashboard/customerComponents/Policies/PolicyDetailPage";
import AgentCommissionWithdrawals from "./components/AgentDashboard/agentComponents/Commissions/AgentCommissionWithdrawals";
import AgentCommissionView from "./components/AgentDashboard/agentComponents/Commissions/AgentCommissionView";
import ViewAgentCustomers from "./components/AgentDashboard/agentComponents/Customers/ViewAgentCustomers";
import ViewAgentPolicies from "./components/AgentDashboard/agentComponents/Insurance/Account/ViewAgentPolicies";
import ViewAgentPolciesPayments from "./components/AgentDashboard/agentComponents/Insurance/Payments/ViewAgentPolicyPayments";
import ViewAgentPolicyClaims from "./components/AgentDashboard/agentComponents/Insurance/Claims/ViewAgentPolicyClaim";
import ChangePassword from "./components/Password/ChangePassword/ChangePassword";
import AdminProfile from "./components/AdminDashboard/adminComponents/Profile/AdminProfile";
import EmployeeProfile from "./components/EmployeeDashboard/employeeComponents/EmployeeProfile";
import CustomerProfile from "./components/CustomerDashboard/customerComponents/Profile/CustomerProfile";
import AgentProfile from "./components/AgentDashboard/agentComponents/Profile/AgentProfile";
import CustomerRecommendationsView from "./components/AgentDashboard/agentComponents/Customers/CustomerRecommendationsView";
import RecommendPlan from "./components/AgentDashboard/agentComponents/Customers/RecommendPlan";
import ViewCustomerQueries from "./components/CustomerDashboard/customerComponents/Queries/ViewCustomerQueries";
import CreateQueryForm from "./components/CustomerDashboard/customerComponents/Queries/CreateQueryFrom";
import DocumentUpload from "./components/CustomerDashboard/customerComponents/Documents/DocumentUpload";
function App() {
  const [role, setRole] = useState(null);
  const [refreshNavbar, setRefreshNavbar] = useState(false);

  useEffect(() => {
    const storedRole = Helper.getStoredRole();
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout role={role} setRole={setRole} refreshNavbar={refreshNavbar} />}>
        <Route index element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/agents/add" element={<AddAgent />} />
        <Route path="/employee-dashboard/agents/add" element={<AddAgent />} />
        <Route path="/admin-dashboard/agents/view" element={<ViewAgents />} />
        <Route
          path="/employee-dashboard/agents/view"
          element={<ViewAgents />}
        />
        <Route
          path="/admin-dashboard/customers/view"
          element={<ViewCustomers />}
        />
        <Route
          path="/agent-dashboard/customers/view"
          element={<ViewAgentCustomers />}
        />
        <Route
          path="/employee-dashboard/customers/view"
          element={<ViewCustomers />}
        />
        <Route
          path="/admin-dashboard/policies/view"
          element={<ViewPolicies />}
        />
        <Route
          path="/employee-dashboard/policies/view"
          element={<ViewPolicies />}
        />
        <Route
          path="/agent-dashboard/policies/view"
          element={<ViewAgentPolicies />}
        />
        <Route
          path="/employee-dashboard/queries/view"
          element={<ViewQueries />}
        />
        <Route
          path="/admin-dashboard/agents/edit/:agentId"
          element={<EditAgentForm />}
        />
        <Route
          path="/employee-dashboard/agents/edit/:agentId"
          element={<EditAgentForm />}
        />
        <Route
          path="/employee-dashboard/employees/edit/:employeeId"
          element={<EditEmployeeForm />}
        />
        <Route
          path="/admin-dashboard/employees/edit/:employeeId"
          element={<EditEmployeeForm />}
        />
        <Route
          path="/admin-dashboard/commissions/view"
          element={<CommissionView />}
        />
        <Route
          path="/employee-dashboard/commissions/view"
          element={<CommissionView />}
        />
        <Route
          path="/agent-dashboard/commissions/view"
          element={<AgentCommissionView />}
        />
        <Route
          path="/admin-dashboard/commissions-withdrawals/view"
          element={<CommissionWithdrawals />}
        />
        <Route
          path="/agent-dashboard/commissions-withdrawals/view"
          element={<AgentCommissionWithdrawals />}
        />
        <Route
          path="/employee-dashboard/commissions-withdrawals/view"
          element={<CommissionWithdrawals />}
        />
        <Route path="/admin-dashboard/settings/tax" element={<TaxSetting />} />
        <Route
          path="/admin-dashboard/policies/payments/view"
          element={<ViewPayment />}
        />
        <Route
          path="/employee-dashboard/policies/payments/view"
          element={<ViewPayment />}
        />
        <Route
          path="/agent-dashboard/policies/payments/view"
          element={<ViewAgentPolciesPayments />}
        />
        <Route
          path="/admin-dashboard/policies/claims/view"
          element={<ViewClaims />}
        />
        <Route
          path="/employee-dashboard/policies/claims/view"
          element={<ViewClaims />}
        />
        <Route
          path="/agent-dashboard/policies/claims/view"
          element={<ViewAgentPolicyClaims />}
        />
        <Route
          path="/admin-dashboard/settings/insurance"
          element={<InsuranceSetting />}
        />
        <Route
          path="/admin-dashboard/profile/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/customer-dashboard/:customerId/profile/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/employee-dashboard/profile/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/agent-dashboard/profile/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/admin-dashboard/settings/states/view"
          element={<ViewStates />}
        />
        <Route
          path="/employee-dashboard/settings/states/view"
          element={<ViewStates />}
        />
        <Route
          path="/employee-dashboard/documents/view"
          element={<ViewDocuments />}
        />
        <Route
          path="/admin-dashboard/settings/states/edit-state/:stateId"
          element={<EditState />}
        />
        <Route
          path="/admin-dashboard/employees/add"
          element={<AddEmployee />}
        />
        <Route path="/admin-dashboard/plans/add" element={<AddPlan setRefreshNavbar={setRefreshNavbar} />} />
        <Route path="/admin-dashboard/plans/view" element={<ViewPlan />} />
        <Route path="/employee-dashboard/plans/view" element={<ViewPlan />} />
        <Route
          path="/admin-dashboard/plans/edit/:planId"
          element={<EditPlan />}
        />
        <Route
          path="/admin-dashboard/schemes/add/:planId"
          element={<AddScheme setRefreshNavbar={setRefreshNavbar} />}
        />
        <Route path="/admin-dashboard/schemes/view" element={<ViewSchemes />} />
        <Route path="/employee-dashboard/employees/view" element={<ViewEmployees />} />
        <Route path="/admin-dashboard/employees/view" element={<ViewEmployees />} />
        <Route
          path="/employee-dashboard/schemes/view"
          element={<ViewSchemes />}
        />
        <Route
          path="/admin-dashboard/schemes/:schemeId"
          element={<SchemeDetails />}
        />
        <Route
          path="/agent-dashboard/marketing"
          element={<CustomerRecommendationsView />}
        />
        <Route
          path="/agent-dashboard/customers/:customerId/recommend-plan"
          element={<RecommendPlan />}
        />
        <Route
          path="/employee-dashboard/schemes/:schemeId"
          element={<SchemeDetails />}
        />
        <Route
          path="/admin-dashboard/settings/cities/view"
          element={<ViewCities />}
        />
        <Route
          path="/employee-dashboard/settings/cities/view"
          element={<ViewCities />}
        />
        <Route
          path="/admin-dashboard/profile"
          element={<AdminProfile />}
        />
         <Route
          path="/employee-dashboard/profile"
          element={<EmployeeProfile />}
        />
        <Route
          path="/customer-dashboard/:customerId/profile"
          element={<CustomerProfile />}
        />
        <Route
          path="/customer-dashboard/:customerId/queries/view"
          element={<ViewCustomerQueries />}
        />
        <Route
          path="/customer-dashboard/:customerId/queries/create"
          element={<CreateQueryForm />}
        />
        <Route
          path="/customer-dashboard/:customerId/documents/view"
          element={<DocumentUpload />}
        />
        <Route
          path="/agent-dashboard/profile"
          element={<AgentProfile />}
        />

        <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="customer-dashboard/:customerId" element={<CustomerDashboard />} />
        <Route path="customer-dashboard/:customerId/plans/view/:planId" element={<SchemePage />} />
        <Route path="customer-dashboard/:customerId/policies/view" element={<PolicyPage />} />
        <Route path="/customer/:customerId/policies/:policyId" element={<PolicyDetailPage />} />
        <Route path="agent-dashboard" element={<AgentDashboard />} />
      </Route>
      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/register" element={<CustomerRegistration />} />
      <Route path="/success" element={<SuccessPage/>} />
        <Route path="/cancel" element={<CancelPage/>} />
    </Routes>
  );
}

export default App;
