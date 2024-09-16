import axios from "axios";
import { NotFoundError } from "../utils/error/ApiError";

  export const getAllQueries = async (params) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/employees/customer/queries`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
        params,  
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to fetch queries');
    }
  };
  export const getAllCustomerQueries = async (customerId,params) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/queries`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
        params,  
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to fetch queries');
    }
  };


  export const respondToQuery = async (queryId, response) => {

    console.log(queryId)
    console.log(response)

    try {
      const token = localStorage.getItem('authToken');
      const responseMessage = await axios.post(`http://localhost:8080/GuardianLifeAssurance/employees/customer/queries/${queryId}/respond`, 
      { response },
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        }
      });
      return responseMessage.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Failed to respond to query');
    }
  };

  export const deleteQuery=async(customerId,queryId)=>{
    try{
      const token=localStorage.getItem("authToken");
      if(!token){
        throw new Error("Authentication token not found. Please log in.");
      }
      const response=await axios.delete(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/queries/${queryId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(error){
      if(error){
        if(error.data.response.status===404){
          throw new NotFoundError(error.data.response.message);
        }
        throw new Error("Network error. Please check your internet connection.");
      }
    }
  }

  export const createCustomerQuery=async(customerId,payLoad)=>{
    try{
    const token=localStorage.getItem("authToken");
      if(!token){
        throw new Error("Authentication token not found. Please log in.");
      }
      const response=await axios.post(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/queries`,payLoad,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(error){
      if(error){
        if(error.data.response.status===404){
          throw new NotFoundError(error.data.response.message);
        }
        throw new Error("Network error. Please check your internet connection.");
      }
    }
  }