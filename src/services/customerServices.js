import axios from "axios";

export const getCustomerDetails = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Please login first" };
        }

        const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/details`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        console.log(response.data)
        return response.data; 

    } catch (error) {
        console.error("Error fetching customer details:", error);
        if (error.response && error.response.data) {
            return { error: error.response.data.message || "An error occurred" };
        }
        return { error: "An error occurred" };
    }
};
export const fetchCustomerAge = async () => {
    try {
      const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/customers/age', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return response.data;  
    } catch (error) {
      console.error("Error fetching customer age:", error);
      return null;
    }
  };

  export const getCustomerById=async(customerId)=>{
    try{
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
        }
        const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}`,{
          headers:{
            Authorization:`Bearer ${token}`
            }
        }
      )
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  }
  
  export const updateCustomer=async (payload)=>{
    try{
      const token = localStorage.getItem("authToken");
      console.log("customer service",payload)
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
        }
        const response = await axios.put(`http://localhost:8080/GuardianLifeAssurance/customers`,payload,{
          headers:{
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`
            }
        }
      )
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  }