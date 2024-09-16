import axios from "axios";

export const getStateCount=async()=>{
    try{
        const response=await axios.get('http://localhost:8080/GuardianLifeAssurance/states/count');
        return response.data;
    }
    catch(error){
        throw new Error("Something Went Wrong Please Try Again Later");
    }
}