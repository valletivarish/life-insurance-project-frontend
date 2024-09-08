import React, { useState } from 'react';
import './InsuranceSetting.css'; 
import { createInsuranceSetting } from '../../../../../services/adminServices'; 

const InsuranceSetting = () => {
  const [claimDeduction, setClaimDeduction] = useState('');
  const [penaltyAmount, setPenaltyAmount] = useState('');

  const handleClaimDeductionChange = (e) => {
    setClaimDeduction(e.target.value);
  };

  const handlePenaltyAmountChange = (e) => {
    setPenaltyAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInsuranceSetting({ claimDeduction, penaltyAmount });
      console.log(`Claim Deduction: ${claimDeduction}, Penalty Amount: ${penaltyAmount}`);
    } catch (error) {
      console.error('Error saving insurance setting:', error);
    }
  };

  return (
    <div className="insurance-settings-card">
      <h1 className="insurance-settings-header">Insurance Settings</h1>
      <form onSubmit={handleSubmit} className="insurance-settings-form">
        <div className="form-group">
          <label htmlFor="claimDeduction">Claim Deduction</label>
          <input
            type="number"
            id="claimDeduction"
            name="claimDeduction"
            value={claimDeduction}
            onChange={handleClaimDeductionChange}
            placeholder="Enter claim deduction"
            className="form-input"
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="penaltyAmount">Penalty Amount</label>
          <input
            type="number"
            id="penaltyAmount"
            name="penaltyAmount"
            value={penaltyAmount}
            onChange={handlePenaltyAmountChange}
            placeholder="Enter penalty amount"
            className="form-input"
            min="0"
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default InsuranceSetting;
