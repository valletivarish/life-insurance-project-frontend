import React, { useState, useEffect } from "react";
import { getAllClaims, approveClaim, rejectClaim } from "../../services/gaurdianLifeAssuranceServices";
import Table from "../../sharedComponents/Table/Table";
import { useSearchParams } from "react-router-dom";
import { showToastError, showToastSuccess } from "../../utils/toast/Toast";
import { sanitizeClaimData } from "../../utils/helpers/SanitizeData";
import './ViewClaims.css';

const ViewClaims = () => {
  const [claims, setClaims] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 5;
  const sortBy = searchParams.get("sortBy") || "claimId";
  const direction = searchParams.get("direction") || "asc";

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [customerId, setCustomerId] = useState(searchParams.get("customerId") || "");
  const [policyNo, setPolicyNo] = useState(searchParams.get("policyNo") || "");
  const [sortField, setSortField] = useState(sortBy);
  const [sortDirection, setSortDirection] = useState(direction);

  const keysToBeIncluded = [
    "claimId", "policyNo", "claimAmount", "claimReason",
    "claimDate", "status", "approvalDate", "rejectionDate"
  ];

  const fetchClaims = async () => {
    try {
      const params = {
        page,
        size,
        sortBy: sortField,
        direction: sortDirection,
        status,
        customerId,
        policyNo,
      };

      const response = await getAllClaims(params);
      const sanitizedClaims = sanitizeClaimData(response, keysToBeIncluded, handleApprove, handleReject);
      setClaims(sanitizedClaims);
    } catch (error) {
      setError("Failed to fetch claims");
      showToastError("Failed to fetch claims");
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [searchParams]);

  const handleApprove = async (claimId) => {
    try {
      await approveClaim(claimId);
      showToastSuccess("Claim approved successfully");
      fetchClaims();
    } catch (error) {
      showToastError("Failed to approve claim");
    }
  };

  const handleReject = async (claimId) => {
    try {
      await rejectClaim(claimId);
      showToastSuccess("Claim rejected successfully");
      fetchClaims();
    } catch (error) {
      showToastError("Failed to reject claim");
    }
  };

  const handleSearch = () => {
    const currentParams = {
      page: page.toString(),
      size: size.toString(),
      sortBy: sortField,
      direction: sortDirection,
    };

    if (status) currentParams.status = status;
    if (customerId) currentParams.customerId = customerId;
    if (policyNo) currentParams.policyNo = policyNo;

    setSearchParams(currentParams);
  };

  const handleReset = () => {
    setStatus("");
    setCustomerId("");
    setPolicyNo("");
    setSortField("claimId");
    setSortDirection("asc");
    setSearchParams({});
  };

  return (
    <div className="view-claims-container">
      <h1>View Claims</h1>

      <div className="view-claims-filters">
        <select
          value={status}
          onChange={(e) => {
            const value = e.target.value;
            setStatus(value);
            const currentParams = new URLSearchParams(searchParams);
            if (value) {
              currentParams.set("status", value);
            } else {
              currentParams.delete("status");
            }
            setSearchParams(currentParams);
          }}
        >
          <option value="">Select Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => {
            const value = e.target.value;
            setCustomerId(value);
            const currentParams = new URLSearchParams(searchParams);
            if (value) {
              currentParams.set("customerId", value);
            } else {
              currentParams.delete("customerId");
            }
            setSearchParams(currentParams);
          }}
        />
        <input
          type="number"
          placeholder="Policy Number"
          value={policyNo}
          onChange={(e) => {
            const value = e.target.value;
            setPolicyNo(value);
            const currentParams = new URLSearchParams(searchParams);
            if (value) {
              currentParams.set("policyNo", value);
            } else {
              currentParams.delete("policyNo");
            }
            setSearchParams(currentParams);
          }}
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="claimId">Claim ID</option>
          <option value="claimAmount">Claim Amount</option>
          <option value="policyNo">Policy Number</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <Table
        data={claims}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default ViewClaims;
