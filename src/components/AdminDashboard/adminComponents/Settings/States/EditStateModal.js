import React, { useState, useEffect } from 'react';
import './EditStateModal.css'; 

const EditStateModal = ({ show, onClose, onSave, currentState }) => {
  const [editedStateName, setEditedStateName] = useState('');

  useEffect(() => {
    if (currentState && currentState.name) {
      setEditedStateName(currentState.name);
    }
  }, [currentState]);

  const handleSave = () => {
    onSave({ ...currentState, name: editedStateName });
  };

  if (!show) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Edit State</h2>
        <div className="modal-body">
          <input
            type="text"
            value={editedStateName}
            onChange={(e) => setEditedStateName(e.target.value)}
            className="modal-input"
            placeholder="Edit state name"
          />
        </div>
        <div className="modal-footer">
          <button className="modal-close-button" onClick={onClose}>Close</button>
          <button className="modal-save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditStateModal;
