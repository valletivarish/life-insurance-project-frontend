import React, { useEffect, useState } from 'react';
import { getAllStates, deactivateState } from '../../../../../services/gaurdianLifeAssuranceServices'; // Deactivate state request here
import { addState } from '../../../../../services/adminServices';
import { editState } from '../../../../../services/gaurdianLifeAssuranceServices';
import Table from '../../../../../sharedComponents/Table/Table'; 
import { useSearchParams } from 'react-router-dom'; 
import { sanitizeStateData } from '../../../../../utils/helpers/SanitizeData'; 
import { required } from '../../../../../utils/validators/Validators';
import './ViewStates.css'; 
import { capitalizeWords } from '../../../../../utils/helpers/CapitilizeData';
import EditStateModal from './EditStateModal';

const ViewStates = () => {
  const [states, setStates] = useState([]);
  const [sanitizedStates, setSanitizedStates] = useState([]);
  const [newState, setNewState] = useState('');
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEditState, setCurrentEditState] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getAllStates();
        if (response && response.content) {
          const sanitized = sanitizeStateData(
            response, 
            ['id', 'name', 'active'],
            handleActivateDeactivate, // Deactivate function passed
            handleEdit
          );
          setSanitizedStates(sanitized);
          setStates(response.content);
        }
      } catch (error) {
        setError('Failed to fetch states');
      }
    };
    fetchStates();
  }, []);

  // Deactivate or Activate state
  const handleActivateDeactivate = async (stateId, isActive) => {
    try {
      await deactivateState(stateId); // Send deactivate request
      const response = await getAllStates(); // Re-fetch updated data
      if (response && response.content) {
        const sanitized = sanitizeStateData(
          response, 
          ['id', 'name', 'active'],
          handleActivateDeactivate,
          handleEdit
        );
        setSanitizedStates(sanitized);
        setStates(response.content);
      }
    } catch (error) {
      setError('Failed to deactivate/activate state');
    }
  };

  const handleAddState = async () => {
    const validationError = required(newState);
    if (validationError) {
      setInputError(validationError);
      return;
    }

    try {
      await addState({ name: capitalizeWords(newState) });
      const response = await getAllStates();
      if (response && response.content) {
        const sanitized = sanitizeStateData(
          response, 
          ['id', 'name', 'active'],
          handleActivateDeactivate,
          handleEdit
        );
        setSanitizedStates(sanitized);
        setStates(response.content);
        setNewState('');
        setInputError(null);
      }
    } catch (error) {
      setError('Failed to add new state');
    }
  };

  const handleEdit = (stateId) => {
    const stateToEdit = states.find(state => state.id === stateId);
    if (stateToEdit) {
      setCurrentEditState(stateToEdit); 
      setTimeout(() => setModalOpen(true), 0); // Delay modal open slightly to ensure state is set
    }
  };

  const handleSaveEdit = async (updatedState) => {
    try {
      await editState(updatedState); 
      const response = await getAllStates(); 
      if (response && response.content) {
        const sanitized = sanitizeStateData(
          response, 
          ['id', 'name', 'active'],
          handleActivateDeactivate,
          handleEdit
        );
        setSanitizedStates(sanitized);
        setStates(response.content); 
      }
      setModalOpen(false); 
    } catch (error) {
      setError('Failed to edit state');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="states-container">
      <h1 className="states-header">List of States</h1>

      <div className="add-state-container">
        <input 
          type="text" 
          value={newState} 
          onChange={(e) => setNewState(e.target.value)} 
          placeholder="Enter new state name"
          className={`add-state-input ${inputError ? 'error-input' : ''}`}
        />
        <button onClick={handleAddState} className="add-state-button">Add State</button>
      </div>
      {inputError && <p className="input-error">{inputError}</p>}

      <Table
        data={sanitizedStates || []}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {isModalOpen && (
        <EditStateModal
          show={isModalOpen}
          currentState={currentEditState} 
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ViewStates;
