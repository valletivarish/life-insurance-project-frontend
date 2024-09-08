export const sanitizeAgentData = (data, keysToBeIncluded, handleEdit, handleDelete) => {
  const sanitizedContent = data.content.map(agent => {
    const sanitizedAgent = {};

    keysToBeIncluded.forEach(key => {
      sanitizedAgent[key] = agent[key];
    });

    sanitizedAgent.actions = (
      <div className="table-buttons">
        <button className="edit-agent-button" onClick={() => handleEdit(agent.agentId)}>
          Edit
        </button>
        <button className="delete-agent-button" onClick={() => handleDelete(agent.agentId)}>
          Delete
        </button>
      </div>
    );

    return sanitizedAgent;
  });

  return {
    ...data,
    content: sanitizedContent,
  };
};
export const sanitizeStateData = (data, keysToBeIncluded, handleActivateDeactivate, handleEdit) => {
  const sanitizedContent = data.content.map(state => {
    const sanitizedState = {};

    keysToBeIncluded.forEach(key => {
      if (key === 'active') {
        sanitizedState[key] = state.active ? 'Active' : 'Inactive';
      } else {
        sanitizedState[key] = state[key];
      }
    });

    sanitizedState.actions = (
      <div className="table-buttons">
        <button
          className={state.active ? "deactivate-state-button" : "activate-state-button"}
          onClick={() => handleActivateDeactivate(state.id, state.active)}
        >
          {state.active ? 'Deactivate' : 'Activate'}
        </button>
        <button
          className="edit-state-button"
          onClick={() => handleEdit(state.id)}
        >
          Edit
        </button>
      </div>
    );

    return sanitizedState;
  });

  return {
    ...data,
    content: sanitizedContent,
  };
};

