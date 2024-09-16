import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updatePlan } from "../../../../services/gaurdianLifeAssuranceServices";
import { showToastSuccess, showToastError } from "../../../../utils/toast/Toast";
// import "./EditPlan.css";

const EditPlan = () => {
    const {planId}=useParams();
  const location = useLocation();
  const { data } = location.state;  // Destructure the passed plan object
  const [planName, setPlanName] = useState(data.planName);
  const [isActive, setIsActive] = useState(data.active);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = { planId: data.planId, planName, active: isActive };
      console.log(updatedPlan); 
      await updatePlan(updatedPlan);
      showToastSuccess("Plan updated successfully.");
      navigate("/plans/view");
    } catch (error) {
      showToastError("Failed to update plan.");
    }
  };

  return (
    <div className="edit-plan-container">
      <h2>Edit Plan</h2>
      <form onSubmit={handleSubmit} className="edit-plan-form">
        <div className="form-group">
          <label htmlFor="planName">Plan Name</label>
          <input
            type="text"
            id="planName"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isActive">Active</label>
          <select
            id="isActive"
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Update Plan
        </button>
      </form>
    </div>
  );
};

export default EditPlan;
