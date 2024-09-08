import axios from "axios"
export  const getAllPlans=async(page,size,sortBy,direction)=>{
    try {
        const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/insurance-plans',{
            params:{
                page,size,sortBy,direction
            }
        })
        return response.data.content;
    }
    catch(error){
        console.log(error);
    }

}
export const getAllStates=async()=>{
    try {
        const response = await axios.get('http://localhost:8080/GuardianLifeAssurance/states')
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}