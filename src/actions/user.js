import * as api from "../api"

export const fetchAllUsers=()=> async(dispatch)=>{
      try{
            const {data} = await api.getAllUsers();
            dispatch({type:'FETCH_USERS',payload:data})
      }
      catch(e){
            alert("Users loading failed try again!!")
      }
}

export const updateUserBio=(id,userData)=>async(dispatch)=>{
      try{
            const {data}=await api.updateUser(id,userData);
            dispatch({type:'UPDATE_USER',payload:data})
      }
      catch(e){
            alert("Profile Edit failed, try again!!")
      }
}

export const updateProfileImage=(id,image)=>async(dispatch)=>{
      try{
            const data = await api.updateProfileImage(id,image);
            console.log("return data from server:",data)
            dispatch({type:'UPDATE_USER',payload:data})
      }
      catch(e){
            alert("Profile Image Upload failed, try again!!")
      }
}