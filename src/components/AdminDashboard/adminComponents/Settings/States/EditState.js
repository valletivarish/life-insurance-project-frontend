import React, { useState, useEffect } from 'react';
import { getStateById, editState } from '../../../../../services/gaurdianLifeAssuranceServices'; // Assuming you have a function to fetch state by ID
import { useParams, useNavigate } from 'react-router-dom'; // To fetch the stateId from the URL and navigate
import { capitalizeWords } from '../../../../../utils/helpers/CapitilizeData';
import { showToastSuccess, showToastError } from '../../../../../utils/toast/Toast';
import './EditState.css'; // Custom CSS for the form

const EditState = () => {
  const { stateId } = useParams(); 
  const [stateName, setStateName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchState = async () => {
      try {
        console.log(stateId)
        const response = await getStateById(parseInt(stateId));
        if (response) {
          setStateName(response.name);
        } else {
          showToastError('Failed to load state data.');
        }
      } catch (error) {
        setError('Failed to fetch state details.');
        showToastError('Failed to fetch state details.');
      }
    };
    fetchState();
  }, [stateId]);

  const handleSave = async () => {
    if (!stateName.trim()) {
      showToastError('State name cannot be empty.');
      return;
    }

    try {
      await editState({ id: stateId, name: capitalizeWords(stateName) });
      showToastSuccess('State updated successfully.');
      navigate('/settings/states/view'); 
    } catch (error) {
      setError('Failed to save state.');
      showToastError('Failed to update state.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-state-container">
      <h1 className="edit-state-header">Edit State</h1>
      <div className="edit-state-form">
        <label>State Name</label>
        <input
          type="text"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          placeholder="Enter state name"
          className="edit-state-input"
        />
        <div className="edit-state-actions">
          <button className="save-state-button" onClick={handleSave}>Save</button>
          <button className="cancel-state-button" onClick={() => navigate('/settings/states')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditState;
