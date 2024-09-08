import React, { useState } from 'react';
import './TaxSetting.css';
import { createTaxSetting } from '../../../../../services/adminServices';
import { positiveNumeric,required } from '../../../../../utils/validators/Validators';
import { showToastError,showToastSuccess } from '../../../../../utils/toast/Toast';

const TaxSetting = () => {
  const [taxPercentage, setTaxPercentage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTaxPercentage(e.target.value);
  };

  const validateForm = () => {
    const requiredError = required(taxPercentage);
    if (requiredError) return requiredError;
    
    const positiveNumericError = positiveNumeric(taxPercentage);
    if (positiveNumericError) return positiveNumericError;
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      showToastError(validationError);
      return;
    }
    
    try {
        console.log(taxPercentage)
      await createTaxSetting( taxPercentage );
      showToastSuccess('Tax percentage saved successfully!');
    } catch (error) {
      showToastError('Failed to save tax percentage. Please try again.');
    }
  };

  return (
    <div className="tax-settings-card">
      <h1 className="tax-settings-header">Tax Settings</h1>
      <form onSubmit={handleSubmit} className="tax-settings-form">
        <div className="form-group">
          <label htmlFor="taxPercentage">Tax Percentage</label>
          <input
            type="number"
            id="taxPercentage"
            name="taxPercentage"
            value={taxPercentage}
            onChange={handleInputChange}
            placeholder="Enter tax percentage"
            className="form-input"
          />
          {error && <p className="error-message">{error}</p>} {/* Display validation error */}
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default TaxSetting;
