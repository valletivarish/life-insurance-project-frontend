import axios from "axios";
import { NotFoundError, ValidationError } from "../utils/error/ApiError";
export const createTaxSetting = async (taxPercentage) => {
  try {
    const token = localStorage.getItem('authToken'); 

    const parsedTaxPercentage = parseFloat(taxPercentage);
    console.log(parsedTaxPercentage)
    if (isNaN(parsedTaxPercentage) || parsedTaxPercentage <= 0) {
      throw new Error("Invalid tax percentage. It must be a positive number.");
    }

    const response = await axios.post(
      'http://localhost:8080/GuardianLifeAssurance/admin/taxes', 
      { taxPercentage: parsedTaxPercentage }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating tax setting:', error);
    throw error;
  }
};


export const createInsuranceSetting = async (data) => {
  try {
    const token = localStorage.getItem('authToken'); 

    const response = await axios.post(
      'http://localhost:8080/GuardianLifeAssurance/admin/insurance-setting', 
      data, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating insurance setting:', error);
    throw error;
  }
};
export const addState=async(data)=>{
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      'http://localhost:8080/GuardianLifeAssurance/admin/states',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
          }
          );
          return response.data;
          } catch (error) {
            console.error('Error adding state:', error);
            throw error;
            }
}
export const addCity=async(stateId,name)=>{
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      `http://localhost:8080/GuardianLifeAssurance/admin/states/${stateId}/cities`,
      {
        name
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
          }
          );
          return response.data;
          } catch (error) {
            console.error('Error adding state:', error);
            throw error;
            }
}
export const addEmployee = async (employeeData) => {
  const token=localStorage.getItem('authToken');
  try {
    const response = await axios.post('http://localhost:8080/GuardianLifeAssurance/admin/employees', employeeData,{
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'  
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.status === 400 || data.status === 401) {
        throw new ValidationError(data.message);
      }
    }
    throw new Error('Something went wrong. Please try again later.');
  }
};

export const addPlan=async(planData)=>{
  const token=localStorage.getItem('authToken');
  try {
    const response = await axios.post('http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans', planData,{
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'  
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.status === 400 || data.status === 401) {
        throw new ValidationError(data.message);
      }
    }
    throw new Error('Something went wrong. Please try again later.');
  }
};


export const createInsuranceScheme = async (insurancePlanId, formDataObj) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return await axios.post(`http://localhost:8080/GuardianLifeAssurance/admin/insurance-plans/${insurancePlanId}/insurance-scheme`, formDataObj, config);
};

export const getAdminDashboardCount = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/admin/counts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch admin dashboard counts.');
  }
};
export const getAdminDetails=async()=>{
  try {
    const token = localStorage.getItem("authToken");
    if(!token){
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/admin/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    if(error){
      if(error.response.data.status===404){
        throw new NotFoundError(error.response.data.message);
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch admin details.');
    }
  }
}