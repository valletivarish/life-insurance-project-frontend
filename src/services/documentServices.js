import axios from "axios";

export const getAllDocuments = async (params) => {
  try {
    const response = await axios.get("http://localhost:8080/GuardianLifeAssurance/employees/documents", { params });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch documents");
  }
};

export const getDocumentById = async (documentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/GuardianLifeAssurance/employees/documents/${documentId}/content`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch document content");
    }
  };
  export const approveDocument = async (documentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/GuardianLifeAssurance/employees/documents/${documentId}/approve`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {

      console.error("Error approving document:", error);
      throw new Error("Failed to approve the document.");
    }
  };

  export const rejectDocument = async (documentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/GuardianLifeAssurance/employees/documents/${documentId}/reject`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
  

      return response.data; 
    } catch (error) {
      console.error("Error rejecting document:", error);
      throw new Error("Failed to reject the document.");
    }
  };
  
  export const getDocumentTypes=async()=>{
    try{
      const token = localStorage.getItem("authToken");
      if(!token){
        throw new Error("Authentication token not found. Please log in.");
      }
      const response=await axios.get("http://localhost:8080/GuardianLifeAssurance/customers/documents/types",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(error){
      throw new Error("Network error. Please check your internet connection.");
    }
  }
  export const uploadDocument = async (customerId, file, documentName) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }
  
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentName', documentName);
  
      const response = await axios.post(
        `http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to upload document. Please try again.");
    }
  };
  // export const updateDocument = async (documentId, file) => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       throw new Error("Authentication token not found. Please log in.");
  //     }
  
  //     const formData = new FormData();
  //     formData.append('document', file);
  
  //     const response = await axios.put(
  //       `http://localhost:8080/GuardianLifeAssurance/customers/documents/${documentId}`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Failed to update document. Please try again.");
  //   }
  // };
  
  export const getAllCustomerDocuments=async(customerId)=>{
    try{
      const token = localStorage.getItem("authToken");
      if(!token){
        throw new Error("Authentication token not found. Please log in.");
      }
      const response=await axios.get(`http://localhost:8080/GuardianLifeAssurance/customers/${customerId}/documents`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(error){
      throw new Error("Network error. Please check your internet connection.");
    }
  }

  export const downloadDocument = async (documentId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }
  
      const response = await axios.get(
        `http://localhost:8080/GuardianLifeAssurance/customers/documents/${documentId}/download`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', 
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document_${documentId}.jpeg`); 
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return response.data;
    } catch (error) {
      throw new Error("Failed to download the document. Please try again.");
    }
  };
  