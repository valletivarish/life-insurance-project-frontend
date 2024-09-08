import axios from "axios";
import { ValidationError } from "../utils/error/ApiError";
export const getAllPlans = async (page, size, sortBy, direction) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/insurance-plans",
      {
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
export const getAllStates = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/states"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAgent = async (payload) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.post(
      "http://localhost:8080/GuardianLifeAssurance/employees/agents",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.status === 400 || data.status === 401) {
        throw new ValidationError(data.message);
      }
    }
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const getAllAgents = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/employees/agents",
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const getAgentById = async (agentId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agents/${agentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const updateAgent = async (payload) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/agents`,
      payload, // Directly passing the payload here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return response if needed
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const deleteAgent = async (agentId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.delete(
      `http://localhost:8080/GuardianLifeAssurance/admin/agents/${agentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the agent. Please try again later.");
  }
};

export const getAllCommissions = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/commissions`,{
        params: params,
        headers: {
          Authorization: `Bearer ${token}`
          }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all commissions. Please try again later.");
  }
};
export const getCommissionTypes = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/commissions/types`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch commission types.");
  }
};

export const getAllWithdrawals = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/commission-withdrawal`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch commission types.");
  }
};
export const getWithdrawalStatus = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/commission-withdrawal/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch commission types.");
  }
};
export const editState = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/states`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing state:", error);
    throw error;
  }
};

export const deactivateState = async (stateId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.delete(
      `http://localhost:8080/GuardianLifeAssurance/admin/states/${stateId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating state:", error);
    throw error;
  }
};
