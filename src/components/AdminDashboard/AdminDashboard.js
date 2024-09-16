import React, { useEffect, useState } from "react";
import { FaCity, FaMoneyCheck, FaUniversity, FaFileAlt, FaFileInvoice, FaSitemap, FaClipboardList, FaClipboardCheck, FaThList } from "react-icons/fa"; 
import { getAdminDashboardCount } from "../../services/adminServices";
import Card from "../../sharedComponents/Card/Card"; 
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    states: 0,
    cities: 0,
    claims: 0,
    policyAccounts: 0,
    payments: 0,
    commissions: 0,
    withdrawnCommissions: 0,
    plans: 0,
    schemes: 0,
  });

  const adminName = "Admin"; // You can dynamically fetch admin's name if needed

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getAdminDashboardCount();
        setCounts(response);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 style={{marginTop:"50px",marginBottom:"20px"}}>Welcome to the Admin Dashboard, {adminName}!</h1>
      <p style={{textAlign:"center",fontSize:"23px"}}>Here are the statistics for your overview:</p>
      <div className="admin-dashboard">
        <Card
          icon={FaUniversity}
          title="States"
          count={counts.states}
          subText="No. of Records"
          link="settings/states/view"
        />
        <Card
          icon={FaCity}
          title="Cities"
          count={counts.cities}
          subText="No. of Records"
          link="settings/cities/view"
        />
        <Card
          icon={FaFileAlt}
          title="Claims"
          count={counts.claims}
          subText="No. of Records"
          link="policies/claims/view"
        />
        <Card
          icon={FaFileInvoice}
          title="Policy Accounts"
          count={counts.policyAccounts}
          subText="No. of Records"
          link="policies/view"
        />
        <Card
          icon={FaMoneyCheck}
          title="Payments"
          count={counts.payments}
          subText="No. of Records"
          link="policies/payments/view"
        />
        <Card
          icon={FaClipboardList}
          title="Commissions"
          count={counts.commissions}
          subText="No. of Records"
          link="commissions/view"
        />
        <Card
          icon={FaClipboardCheck}
          title="Withdrawn Commissions"
          count={counts.withdrawnCommissions}
          subText="No. of Records"
          link="commissions-withdrawals/view"
        />
        <Card
          icon={FaSitemap}
          title="Plans"
          count={counts.plans}
          subText="No. of Records"
          link="plans/view"
        />
        <Card
          icon={FaThList}
          title="Schemes"
          count={counts.schemes}
          subText="No. of Records"
          link="schemes/view"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
