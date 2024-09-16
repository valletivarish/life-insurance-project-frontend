import axios from "axios";
import { NotFoundError } from "../utils/error/ApiError";

export const getAgentCommissionWithdrawals = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/commission-withdrawal`,
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
export const getAgentCommissions = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/commissions`,
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
    throw new Error("Failed to get all commissions. Please try again later.");
  }
};

export const getAllCustomersByAgent = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/customers`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};
export const getAgentPolicies = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/policies`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};
export const getAgentPolicyPayments = async (params) => {
  try {
    console.log(params);
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/policies/payments`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};
export const getAgentPolicyClaims = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/policies/claims`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};

export const getAgentProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/agent/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error) {
      if (error.data.response.status === 404) {
        throw new NotFoundError("Agent Profile not found");
      }
      throw new Error("Something went wrong please try again later");
    }
  }
};

export const sendRecommendationEmail = async (payLoad) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.post(
      `http://localhost:8080/GuardianLifeAssurance/agent/send-recommendation-email`,
      payLoad,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error) {
      if (error.data.response.status === 404) {
        throw new NotFoundError(error.data.response.message);
      }
      throw new Error("Something went wrong please try again later");
    }
  }
};
