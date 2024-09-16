import axios from 'axios';
import { ValidationError } from '../utils/error/ApiError';

// Fetch Insurance Schemes by Plan ID (Paged)
export const fetchSchemesByPlanId = async (planId, page = 0, size = 1) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/customers/plans/${planId}/schemes`,
      {
        params: { page, size },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    throw error;
  }
};


export const fetchSchemeImage = async (schemeId) => {
  try {
    const token = localStorage.getItem("authToken"); 
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/customers/schemes/${schemeId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token in headers
        },
        responseType: "blob"
      }
    );
    return URL.createObjectURL(response.data); // Create an object URL for the image
  } catch (error) {
    console.error("Error fetching scheme image:", error);
    throw error;
  }
};


export const initiateCheckout = async (requestData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/GuardianLifeAssurance/checkout/create-checkout-session",
      {
        amount: requestData.amount, 
        requestData,
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      }
    );

    window.location.href = response.data; // Redirect to the URL returned by the backend
  } catch (error) {
    console.error("Error initiating checkout session:", error);
  }
};


export const calculateInterest=async(body)=>{
  try{
    const response=await axios.post('http://localhost:8080/GuardianLifeAssurance/InterestCalculator',body,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    }})
    return response.data
}
catch(error){
  if(error){
    if(error.status===400){
      throw new ValidationError(error.response.data.message);
    }
  }
}}

export const fetchAllPoliciesBtCustomerId=async(customerId,params)=>{
  try{
    const response=await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/policies`,{
      params:params,
      headers:{
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    }
  })
  console.log(response.data)
  return response.data;

}
catch(error){
  console.error("Error fetching all policies by customer ID:", error);
}
}
export const fetcByPolicyId=async(customerId,policyId)=>{
  try{
    const response=await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/policies/${policyId}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    }
  })
  console.log(response.data)
  return response.data;

}
catch(error){
  console.error("Error fetching all policies by customer ID:", error);
}
}

export const initiateInstallmentCheckout = async (customerId, installmentId, amount) => {
  try {
    console.log("Initiating checkout for amount:", amount);
    console.log("CustomerId:", customerId, "InstallmentId:", installmentId);

    const response = await axios.post(
      `http://localhost:8080/GuardianLifeAssurance/checkout/${customerId}/policies/installments/${installmentId}/create-checkout-session`,
      {
        amount: amount // Send the amount as part of the request body
      },
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the correct Content-Type header
          Authorization: `Bearer ${localStorage.getItem("authToken")}` // Include the token in Authorization header
        }
      }
    );

    return response.data; // Return the response data (URL for checkout session)
  } catch (error) {
    console.error("Error initiating Stripe checkout:", error);
    throw error; // Propagate the error to handle in the component
  }
};

export const downloadReceipt=async(installmentId)=>{
  try {
    const response = await axios.get(
      `http://localhost:8080/GuardianLifeAssurance/customers/installments/receipt/${installmentId}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt_${installmentId}.pdf`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading receipt:", error);
  }
}
export const cancelPolicy=async(customerId,policyNo)=>{
  try{
    const token=localStorage.getItem('authToken');
    if(!token){
      throw new Error();
    }
    const response=await axios.delete(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/policies/cancel/${policyNo}`,{
      headers:{
        Authorization:`Bearer ${token}`
    }})
    return response.data;
  }
  catch(error){
    throw new Error("Something went wrong Please Try again later");
  }
}
export const getPlanCount=async()=>{
  try{
      const response=await axios.get('http://localhost:8080/GuardianLifeAssurance/insurance-plans/count');
      return response.data;
  }
  catch(error){
      throw new Error("Something Went Wrong Please Try Again Later");
  }
}
export const claimPolicy = async (customerId, payLoad) => {
  try {
    console.log(payLoad)
    const formData = new FormData();
    formData.append('policyNo', payLoad.policyNo);   
    formData.append('claimAmount', payLoad.claimAmount);
    formData.append('claimReason', payLoad.claimReason);
    formData.append('document', payLoad.document); 
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    const response = await axios.post(
      `http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/claims`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const getSchemesByPlanId=async (planId)=>{
  try{
    const token=localStorage.getItem("authToken");
    if(!token){
      throw new Error("Please Login First");
    }
    const response=await axios.get(`http://localhost:8080/GuardianLifeAssurance/agent/plans/${planId}/schemes`,{
      headers:{
        Authorization:`Bearer ${token}`
    }
  })
  console.log(response)
  return response.data;
}
catch(error){
  throw new Error("Something Went Wrong Please Try Again Later");
}
}