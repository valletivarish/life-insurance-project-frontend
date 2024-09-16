import axios from "axios";
import { ValidationError } from "../utils/error/ApiError";
export const getAllPlans = async (params) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/insurance-plans",
      {
        params:params,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllStates = async (params) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/states",{
        params
      }
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
    return response
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
export const activateState = async (stateId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/states/activate/${stateId}`,
      {},
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
export const getStateById = async (stateId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/states/${stateId}`,
      {},
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
export const getCitiesByState=async(stateId)=>{
  try{
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/states/${stateId}/cities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("cities",response)
    return response.data;
  } catch (error) {
    console.error("Error deactivating state:", error);
    throw error;
  }
}

export const deactivateCity = async (cityId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.delete(
      `http://localhost:8080/GuardianLifeAssurance/admin/cities/${cityId}`,
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
export const activateCity = async (cityId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/cities/activate/${cityId}`,
      {},
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
export const activatePlan=async(planId)=>{
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans/${planId}/activate`,
      {},
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
}

export const deactivatePlan = async (planId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.delete(
      `http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans/${planId}`,
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
export const updatePlan=async(data)=>{
  try {
    console.log(data)
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans`,
      {
        planId:data.planId,
        planName:data.planName,
        active:data.active
      },
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
}

export const getRequiredDocuments=async()=>{
  try{
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/documents-required`,
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
}

export const getAllSchemes = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      "http://localhost:8080/GuardianLifeAssurance/admin/insurance-schemes",
      {
        params: {
          page: params.page || 0,
          size: params.size || 5,
          sortBy: params.sortBy || "schemeName",
          direction: params.direction || "ASC",
          minAmount: params.minAmount || null,
          maxAmount: params.maxAmount || null,
          minPolicyTerm: params.minPolicyTerm || null,
          maxPolicyTerm: params.maxPolicyTerm || null,
          planId: params.planId || null,
          schemeName: params.schemeName || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    throw new Error("Failed to fetch insurance schemes. Please try again.");
  }
};

export const getSchemeById = async (schemeId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/admin/insurance-scheme/${schemeId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch scheme details");
  }
};

export const updateScheme = async (insurancePlanId, schemeData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    console.log(schemeData.schemeId)
    const response = await axios.put(
      `http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans/${insurancePlanId}/insurance-scheme`,
      schemeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update scheme");
  }
};

export const getAllCustomers = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};

export const downloadCustomerReport = async () => {
  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/customers/pdf', {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CustomerReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Something went wrong please try again");
  }
};

export const deactivateCustomer=async (customerId)=>{
  try{
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
      }
      const response = await axios.delete(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}`,{
        headers:{
          Authorization:`Bearer ${token}`
          }
        }
      )
      console.log(response)
      return response;
  }
  catch(error){
    console.log(error)
  }
}

export const activateCustomer=async (customerId)=>{
  try{
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
      }
      const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/customers/activate/${customerId}`,{},{
        headers:{
          Authorization:`Bearer ${token}`
          }
      }
    )
    return response;
  }
  catch(error){
    console.log(error)
  }
}



export const getAllPolicies = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/customers/policies', {
      params:params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllPayments=async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/employees/payments', {
      params:params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const downloadPaymentReport = async (startDate, endDate) => {
  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/payments/pdf', {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      },
      params: {
        startDate: startDate || '',
        endDate: endDate || ''
      }
    });

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2); 
      const day = (`0${d.getDate()}`).slice(-2); 
      return `${year}-${month}-${day}`;
    };

    const fromDate = startDate ? formatDate(startDate) : "StartDate";
    const toDate = endDate ? formatDate(endDate) : "EndDate";

    const fileName = `PaymentReport_${fromDate}_to_${toDate}.pdf`;

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Something went wrong, please try again");
  }
};
export const getAllClaims=async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/admin/claims', {
      params:params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const approveClaim=async (claimId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/admin/claims/${claimId}/approve`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const rejectClaim=async (claimId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/admin/claims/${claimId}/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const downloadAgentReport = async () => {
  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/agents/pdf', {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AgentReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Something went wrong please try again");
  }
};
export const downloadCommissionReport = async (params) => {
  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/commission/pdf', {
      responseType: 'blob',
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CommissionReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Something went wrong please try again");
  }
};
export const downloadCommissionWithdrawalReport = async (params) => {
  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/commission/pdf', {
      responseType: 'blob',
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CommissionWithdrawalReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Something went wrong please try again");
  }
};
export const approveWithdrawal=async (withdrawalId)=>{
  try{
    const token=localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/admin/withdrawal/${withdrawalId}/approve`,{},{
      headers:{
        Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}
catch(error){
  throw new Error("Something went wrong please try again");
}
}
export const rejectWithdrawal=async (withdrawalId)=>{
  try{
    const token=localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/admin/withdrawal/${withdrawalId}/reject`,{},{
      headers:{
        Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}
catch(error){
  throw new Error("Something went wrong please try again");
}
}