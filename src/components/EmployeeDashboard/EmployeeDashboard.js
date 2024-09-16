import React, { useEffect, useState } from "react";
import { FaUserTie, FaUsers, FaFolder, FaSitemap, FaThList, FaFileInvoice, FaMoneyCheck, FaFileAlt, FaClipboardList, FaQuestionCircle, FaUniversity, FaCity } from "react-icons/fa"; 
import { getEmployeeDashboardCount } from "../../services/employeeServices"; 
import Card from "../../sharedComponents/Card/Card"; 
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [counts, setCounts] = useState({
    agents: 0,
    employees: 0,
    customers: 0,
    customerDocuments: 0,
    insurancePlans: 0,
    insuranceSchemes: 0,
    policyAccounts: 0,
    policyPayments: 0,
    policyClaims: 0,
    commissions: 0,
    queries: 0,
    states: 0,
    cities: 0,
  });

  const employeeName = "Varish"

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getEmployeeDashboardCount(); 
        setCounts(response);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="employee-dashboard-container">
      <h1 style={{marginTop:"50px",marginBottom:"20px"}}>Welcome to the Employee Dashboard, {employeeName} !</h1>
      <p style={{textAlign:"center",fontSize:"23px"}}>Here are the statistics for your overview  </p>
      <div className="employee-dashboard">
        <Card
          icon={FaUserTie}
          title="Agents"
          count={counts.agents}
          subText="No. of Records"
          link="agents/view"
          className="agents"
        />
        <Card
          icon={FaUsers}
          title="Employees"
          count={counts.employees}
          subText="No. of Records"
          link="employees/view"
          className="employees"
        />
        <Card
          icon={FaUsers}
          title="Customers"
          count={counts.customers}
          subText="No. of Records"
          link="customers/view"
          className="customers"
        />
        <Card
          icon={FaFolder}
          title="Customer Documents"
          count={counts.customerDocuments}
          subText="No. of Records"
          link="documents/view"
          className="customerDocuments"
        />
        <Card
          icon={FaSitemap}
          title="Insurance Plans"
          count={counts.plans}
          subText="No. of Records"
          link="plans/view"
          className="policyAccounts"
        />
        <Card
          icon={FaThList}
          title="Insurance Schemes"
          count={counts.schemes}
          subText="No. of Records"
          link="schemes/view"
          className="schemes"
        />
        <Card
          icon={FaFileInvoice}
          title="Policy Accounts"
          count={counts.policyAccounts}
          subText="No. of Records"
          link="policies/view"
          className="policyAccounts"
        />
        <Card
          icon={FaMoneyCheck}
          title="Policy Payments"
          count={counts.policyPayments}
          subText="No. of Records"
          link="policies/payments/view"
          className="policyPayments"
        />
        <Card
          icon={FaFileAlt}
          title="Policy Claims"
          count={counts.policyClaims}
          subText="No. of Records"
          link="policies/claims/view"
          className="policyClaims"
        />
        <Card
          icon={FaClipboardList}
          title="Commissions"
          count={counts.commissions}
          subText="No. of Records"
          link="commissions/view"
          className="commissions"
        />
        <Card
          icon={FaQuestionCircle}
          title="Queries"
          count={counts.queries}
          subText="No. of Records"
          link="queries/view"
          className="queries"
        />
        <Card
          icon={FaUniversity}
          title="States"
          count={counts.states}
          subText="No. of Records"
          link="settings/states/view"
          className="states"
        />
        <Card
          icon={FaCity}
          title="Cities"
          count={counts.cities}
          subText="No. of Records"
          link="settings/cities/view"
          className="cities"
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
