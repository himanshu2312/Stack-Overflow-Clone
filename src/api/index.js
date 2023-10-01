import axios from 'axios'

// const API=axios.create({baseURL:'https://stack-overflow-2312.onrender.com'}) // for deployment api_Url
const API=axios.create({baseURL:'http://localhost:5000'}) // for local api_Url

API.interceptors.request.use((req)=>{
      if(localStorage.getItem('Profile')){
            req.headers.authorization = `bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
      }
      return req;
})

export const login=(authData)=>API.post('/user/login',authData);
export const signup=(authData)=>API.post('/user/signup',authData);
export const getAllUsers=()=>API.get('/user/get');
export const updateUser=(id,userData)=>API.patch(`/user/update/${id}`,userData)

export const postQuestion=(questionData)=>API.post('/questions/ask',questionData);
export const getAllQuestions=()=>API.get('/questions/get');
export const deletedQuestion=(id)=> API.delete(`/questions/delete/${id}`)
export const voteQuestion=(id,value,userId)=> API.patch(`/questions/vote/${id}`,{value,userId})

export const postAnswer=(id,answerData)=>API.patch(`/answers/post/${id}`,answerData);
export const deleteAnswer=(id,answerData)=>API.patch(`/answers/delete/${id}`,answerData);

export const updateProfileImage=(id,image)=>API.patch(`/user/profileImage/${id}`, image);
