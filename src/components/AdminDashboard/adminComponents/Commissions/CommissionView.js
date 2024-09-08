import React, { useState, useEffect, useCallback } from "react";
import { getAllCommissions, getCommissionTypes } from "../../../../services/gaurdianLifeAssuranceServices";
import Table from "../../../../sharedComponents/Table/Table";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../../utils/helpers/Debounce";
import { showToastError } from "../../../../utils/toast/Toast";
import "./CommissionView.css";

const CommissionView = () => {
  const [commissions, setCommissions] = useState([]);
  const [commissionTypes, setCommissionTypes] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 10;
  const sortBy = searchParams.get("sortBy") || "commissionId";
  const direction = searchParams.get("direction") || "ASC";

  const [agentId, setAgentId] = useState(searchParams.get("agentId") || "");
  const [commissionType, setCommissionType] = useState(searchParams.get("commissionType") || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchCommissionTypes = async () => {
      try {
        const response = await getCommissionTypes();
        setCommissionTypes(response);
      } catch (error) {
        console.error("Failed to fetch commission types:", error);
      }
    };
    fetchCommissionTypes();
  }, []);

  const handleFilterChange = (key, value) => {
    switch (key) {
      case "agentId":
        setAgentId(value);
        setSearchParams((prevParams) => {
          const newParams = new URLSearchParams(prevParams);
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
          return newParams;
        });
        break;
      case "commissionType":
        setCommissionType(value);
        setSearchParams((prevParams) => {
          const newParams = new URLSearchParams(prevParams);
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
          return newParams;
        });
        break;
      default:
        break;
    }
  };
  const convertDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  

  const handleSearch = () => {
    const formattedFromDate = convertDateToDDMMYYYY(fromDate);
  const formattedToDate = convertDateToDDMMYYYY(toDate);
    const params = {
      page,
      size,
      sortBy,
      direction,
      agentId,
      commissionType,
      fromDate:formattedFromDate,
      toDate:formattedToDate,
    };
    setSearchParams(params);
    debouncedFetchCommissions(params);
  };

  const handleReset = () => {
    setAgentId("");
    setCommissionType("");
    setFromDate("");
    setToDate("");
    setSearchParams(new URLSearchParams());
    fetchCommissions({ page: 0, size: 10, sortBy: "commissionId", direction: "ASC" });
  };

  const fetchCommissions = async (params) => {
    try {
      const response = await getAllCommissions(params);
      setCommissions(response);
    } catch (error) {
      setError("Failed to fetch commissions");
      showToastError("Failed to fetch commissions");
    }
  };

  const debouncedFetchCommissions = useCallback(
    debounce((params) => fetchCommissions(params), 300),
    []
  );

  useEffect(() => {
    const params = {
      page,
      size,
      sortBy,
      direction,
      agentId,
      commissionType,
    };
    fetchCommissions(params);
  }, [page, size, sortBy, direction, agentId, commissionType]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="commission-container">
      <div className="commission-card">
        <h1 className="commission-header">Commissions</h1>

        {/* Filters */}
        <div className="filters">
          <input
            type="number"
            placeholder="Agent ID"
            value={agentId}
            onChange={(e) => handleFilterChange("agentId", e.target.value)}
          />
          <select
            value={commissionType}
            onChange={(e) => handleFilterChange("commissionType", e.target.value)}
          >
            <option value="">Select Commission Type</option>
            {commissionTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>

        <Table
          data={commissions || []}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};

export default CommissionView;
