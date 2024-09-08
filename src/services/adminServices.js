import axios from "axios";

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