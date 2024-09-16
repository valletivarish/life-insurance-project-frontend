import axios from "axios";
export const getEmployeeDashboardCount = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
  
    try {
      const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/employees/counts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admin dashboard counts.');
    }
  };
  export const getAllEmployees = async (params) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
  
      const response = await axios.get(
        `http://localhost:8080/GuardianLifeAssurance/admin/employees`, 
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong. Please try again later.");
    }
  };
  
  
  export const deleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
  
      const response = await axios.delete(
        `http://localhost:8080/GuardianLifeAssurance/admin/employees/${employeeId}`,
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
  export const fetchEmployeeDetails = async (employeeId) => {

    const token=localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8080/GuardianLifeAssurance/employees/employees/${employeeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch employee details");
    }
  
    return response.json();
  };
  
  
  export const updateEmployeeDetails = async (employeeData) => {

    try{
      const token = localStorage.getItem('authToken'); 
    const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/employees`,employeeData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    return response.data
    }
    catch(error){
      console.error(error);
    }

  };
  export const getEmployeeProfile=async ()=>{
    try{
      const token = localStorage.getItem('authToken');
      if(!token){
        throw new Error("Authentication token not found. Please log in again.");
      }
      const response=await axios.get(`http://localhost:8080/GuardianLifeAssurance/employees/profile`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }})
      return response.data;
    }
    catch(error){
      if(error){
        if(error.response.data.status===404){
          throw new Error("Employee profile not found");
        }
        throw new Error("Something went wrong please try again later");
      }
    }
  }
  