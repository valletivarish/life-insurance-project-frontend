import React, { useState, useEffect, useCallback } from "react";
import { deleteAgent, downloadAgentReport, getAllAgents, getAllStates } from "../../../services/gaurdianLifeAssuranceServices";
import Table from "../../../sharedComponents/Table/Table";
import { useSearchParams, useNavigate } from "react-router-dom";
import { sanitizeAgentData } from "../../../utils/helpers/SanitizeData";
import { debounce } from "../../../utils/helpers/Debounce";
import { showToastError, showToastSuccess } from "../../../utils/toast/Toast";
import "./ViewAgents.css";
import PdfDownloadButton from "../../../sharedComponents/Button/PdfDownloadButton";
import { Helper } from "../../../utils/helpers/Helper";

const ViewAgents = () => {
  const [agents, setAgents] = useState({});
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 10;
  const sortBy = searchParams.get("sortBy") || "agentId";
  const direction = searchParams.get("direction") || "ASC";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const isActive = searchParams.get("isActive") === "true"
    ? true
    : searchParams.get("isActive") === "false"
    ? false
    : null;
  const name = searchParams.get("name") || "";

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesData = await getAllStates();
        setStates(statesData.content);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = (stateName) => {
    const selectedState = states.find((s) => s.name === stateName);
    setCities(selectedState ? selectedState.cities : []);
    handleSearchChange("state", stateName);
  };
  const handleDownloadReport = () => {
    downloadAgentReport();
  };

  const debouncedFetchAgents = useCallback(
    debounce(async (params) => {
      try {
        const response = await getAllAgents(params);
        const sanitizedData = sanitizeAgentData(response, [
          "agentId", "firstName", "lastName", "email", "username", "state", "city"
        ], handleEdit, handleDelete);
        setAgents(sanitizedData);
      } catch (err) {
        setError("Failed to fetch agents");
      }
    }, 300),
    []
  );

  useEffect(() => {
    const params = {
      page, size, sortBy, direction, city, state, isActive, name,
    };
    debouncedFetchAgents(params);
  }, [page, size, sortBy, direction, city, state, isActive, name, debouncedFetchAgents]);

  const handleSearchChange = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };
  const getRoleLink = (link = "") => {
    return Helper.getRoleLink(localStorage.getItem("role"),null, link);
  };

  const handleEdit = (agentId) => {
    const roleBasedLink = getRoleLink(`/agents/edit/${agentId}`);
    console.log(roleBasedLink)
    navigate(roleBasedLink);
  };

  const handleDelete = async (agentId) => {
    try {
      await deleteAgent(agentId);
      debouncedFetchAgents({
        page, size, sortBy, direction, city, state, isActive, name,
      });
      showToastSuccess("Agent deactivated successfully");
    } catch (error) {
      setError("Failed to deactivate agent. Please try again.");
      showToastError("Failed to deactivate agent. Please try again.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-agents-container">
      <div className="view-agents-card">
        <h1 className="view-agents-header">View Agents</h1>
        <div className="view-agents-filters">
          <select value={state} onChange={(e) => handleStateChange(e.target.value)}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
          <select value={city} onChange={(e) => handleSearchChange("city", e.target.value)} disabled={!cities.length}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.city}>{city.city}</option>
            ))}
          </select>
          <input type="text" placeholder="Name" value={name} onChange={(e) => handleSearchChange("name", e.target.value)} />
          <select value={isActive !== null ? isActive : ""} onChange={(e) => handleSearchChange("isActive", e.target.value)}>
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
          <PdfDownloadButton action={handleDownloadReport} />
        <Table data={agents || []} searchParams={searchParams} setSearchParams={setSearchParams} paginationData={agents} />
      </div>
    </div>
  );
};

export default ViewAgents;
