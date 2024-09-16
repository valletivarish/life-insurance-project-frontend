import React, { useState, useEffect, useCallback } from "react";
import { getAllPlans, activatePlan, deactivatePlan } from "../../../../services/gaurdianLifeAssuranceServices";
import Table from "../../../../sharedComponents/Table/Table";
import { useSearchParams, useNavigate } from "react-router-dom";
import { debounce } from "../../../../utils/helpers/Debounce";
import { showToastError, showToastSuccess } from "../../../../utils/toast/Toast";
import { sanitizePlanData } from "../../../../utils/helpers/SanitizeData";
import "./ViewPlan.css";

const ViewPlan = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 10;
  const sortBy = searchParams.get("sortBy") || "planId";
  const direction = searchParams.get("direction") || "ASC";

  const debouncedFetchPlans = useCallback(
    debounce(async () => {
      try {
        const response = await getAllPlans(page, size, sortBy, direction);
        const sanitizedData = sanitizePlanData(response, handleEdit, handleToggleStatus);
        setPlans(sanitizedData);
      } catch (err) {
        setError("Failed to fetch plans");
        showToastError("Failed to fetch plans");
      }
    }, 300),
    [page, size, sortBy, direction]
  );

  useEffect(() => {
    debouncedFetchPlans();
  }, [debouncedFetchPlans]);

  const handleEdit = (planId, data) => {
    // Navigate to the edit page and pass the selected plan data
    console.log(data);
    navigate(`/plans/edit/${planId}`, { state: { data } });
  };

  const handleToggleStatus = async (planId, isActive) => {
    try {
      const statusAction = isActive ? "deactivate" : "activate";
      if (isActive) {
        await deactivatePlan(planId);
      } else {
        await activatePlan(planId);
      }
      showToastSuccess(`Plan ${statusAction}d successfully`);
      debouncedFetchPlans(); 
    } catch (err) {
      showToastError(`Failed to ${isActive ? "deactivate" : "activate"} plan`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-plans-container">
      <h1 className="view-plans-header">View Insurance Plans</h1>
      <Table data={plans || []} searchParams={searchParams} setSearchParams={setSearchParams} />
    </div>
  );
};

export default ViewPlan;
