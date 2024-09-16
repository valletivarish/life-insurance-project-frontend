import React from "react";
import { FaUser, FaFolder, FaFileInvoice, FaQuestionCircle, FaPen, FaKey } from "react-icons/fa";
import Card from "../../sharedComponents/Card/Card";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  return (
    <div className="customer-dashboard-container">
      <h1 style={{ marginTop: "50px", marginBottom: "20px" }}>
        Welcome to the Customer Dashboard, {firstName} {lastName}!
      </h1>
      <p style={{ textAlign: "center", fontSize: "23px" }}>
        Here are your dashboard options
      </p>

      <div className="customer-dashboard">
        <Card
          icon={FaUser}
          title="Profile"
          subText="Manage your profile"
          link="profile"
          className="profile"
        />

        <Card
          icon={FaFolder}
          title="Documents"
          subText="Manage your documents"
          link="documents/view"
          className="documents"
        />

        <Card
          icon={FaFileInvoice}
          title="Insurance Account"
          subText="View your insurance account"
          link="policies/view"
          className="insurance-account"
        />

        <Card
          icon={FaQuestionCircle}
          title="Queries"
          subText="View your queries"
          link="queries/view"
          className="queries"
        />

        <Card
          icon={FaPen}
          title="Create Query"
          subText="Submit a new query"
          link="queries/create"
          className="create-query"
        />

        <Card
          icon={FaKey}
          title="Change Password"
          subText="Update your password"
          link="profile/change-password"
          className="change-password"
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;
