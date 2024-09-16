import React, { useState, useEffect } from "react";
import { getSchemeById, updateScheme } from "../../../../services/gaurdianLifeAssuranceServices";
import { useParams, useNavigate } from "react-router-dom";
import { showToastSuccess, showToastError } from "../../../../utils/toast/Toast";
import './SchemeDetails.css';
import { htmlToPlainText } from "../../../../utils/helpers/Converter";
import { Helper } from "../../../../utils/helpers/Helper";

const SchemeDetails = () => {
  const { schemeId } = useParams();
  const [scheme, setScheme] = useState({});
  const [originalScheme, setOriginalScheme] = useState({});
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const data = await getSchemeById(schemeId);
        console.log(data);
        setScheme(data);
        setOriginalScheme(data);
      } catch (err) {
        setError("Failed to fetch scheme details.");
      }
    };

    fetchSchemeDetails();
  }, [schemeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheme({
      ...scheme,
      [name]: value,
    });
  };
  const getRoleLink = (link = "") => {
    return Helper.getRoleLink(localStorage.getItem("role"), link);
  };

  const handleSave = async () => {
    try {
        console.log(scheme.schemeId)
      const schemeData = {
        schemeId:scheme.schemeId,
        schemeName: scheme.schemeName,
        planName: scheme.planName,
        minAmount: scheme.minAmount,
        maxAmount: scheme.maxAmount,
        minPolicyTerm: scheme.minPolicyTerm,
        maxPolicyTerm: scheme.maxPolicyTerm,
        minAge: scheme.minAge,
        maxAge: scheme.maxAge,
        profitRatio: scheme.profitRatio,
        registrationCommRatio: scheme.registrationCommRatio,
        installmentCommRatio: scheme.installmentCommRatio,
        detailDescription: scheme.detailDescription,
      };
      await updateScheme(scheme.planId, schemeData);
      showToastSuccess("Scheme updated successfully");
      setIsEditing(false);
      const roleBasedLink = getRoleLink(`/schemes/view`);
      navigate(roleBasedLink);
    } catch (error) {
      showToastError("Failed to update scheme");
    }
  };
  

  const handleCancel = () => {
    setScheme(originalScheme); 
    setIsEditing(false);
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`; 
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="scheme-details-container">
      <h1>{scheme.schemeName} - Full Details</h1>
      <div className="scheme-details">
        <label>Scheme Name</label>
        <input
          type="text"
          name="schemeName"
          value={scheme.schemeName}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Plan Name</label>
        <input
          type="text"
          name="planName"
          value={scheme.planName}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Min Amount</label>
        <input
          type="number"
          name="minAmount"
          value={scheme.minAmount}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Max Amount</label>
        <input
          type="number"
          name="maxAmount"
          value={scheme.maxAmount}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Min Policy Term</label>
        <input
          type="number"
          name="minPolicyTerm"
          value={scheme.minPolicyTerm}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Max Policy Term</label>
        <input
          type="number"
          name="maxPolicyTerm"
          value={scheme.maxPolicyTerm}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Min Age</label>
        <input
          type="number"
          name="minAge"
          value={scheme.minAge}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Max Age</label>
        <input
          type="number"
          name="maxAge"
          value={scheme.maxAge}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Profit Ratio (%)</label>
        <input
          type="number"
          step="0.1"
          name="profitRatio"
          value={scheme.profitRatio}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Registration Commission (INR)</label>
        <input
          type="number"
          name="registrationCommRatio"
          value={scheme.registrationCommRatio}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Installment Commission (%)</label>
        <input
          type="number"
          name="installmentCommRatio"
          value={scheme.installmentCommRatio}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Detail Description</label>
        <textarea
          name="detailDescription"
          value={htmlToPlainText(scheme.detailDescription)}
          onChange={handleInputChange}
          onInput={autoResize}
          style={{ resize: "vertical", overflowX: "hidden", whiteSpace: "pre-wrap", wordWrap: "break-word", overflowWrap: "break-word" }}
          disabled={!isEditing}
        />

        <div>
          {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
          {isEditing && (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
