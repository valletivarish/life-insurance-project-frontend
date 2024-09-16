import axios from "axios";
import { ValidationError } from "../utils/error/ApiError";

export const  login=async(usernameOrEmail,password)=>{
    try{
        const response=await axios.post('http://localhost:8080/GuardianLifeAssurance/auth/login',{
            usernameOrEmail,
            password
        })
        console.log(response)
        return response;
    }
    catch(error){
        if(error.response.data){
            const data=error.response.data;
            if(data.status===400){
                throw new ValidationError(data.message);
            }
            if (data.status === 401) {
                throw new ValidationError(data.message);
              }
              throw new Error("Something went wrong. Please try again later.");
        }
    }
}
export const register = async (payload) => {
    try {
      const response = await axios.post('http://localhost:8080/GuardianLifeAssurance/auth/customer-registration', payload);
      return response;
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

export const changePassword=async(payLoad)=>{

  try{
    const token = localStorage.getItem("authToken");
    if(!token){
      throw new Error("You are not logged in");
    }
    const response=await axios.put(`http://localhost:8080/GuardianLifeAssurance/auth/change-password`,payLoad,{
      headers:{

        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    }});
    return response.data;
}
catch(error){
  if(error){
    if(error.response.data.status===400){
      throw new ValidationError(error.response.data.message);
    }
    throw new error("Something went wrong please try again later");
  }
}}