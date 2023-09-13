import * as api from "../api/index"

export const askQuestion=(questionData,navigate)=> async(dispatch)=>{
      try{
            const {data}= await api.postQuestion(questionData);
            dispatch({type:'ASK_QUESTION',payload:data})
            dispatch(fetchAllQuestions())
            navigate("/")
      }
      catch(e){
            alert("Question posting failed try again!!")
      }
}

export const fetchAllQuestions=()=> async(dispatch)=>{
      try{
            const {data}= await api.getAllQuestions();
            dispatch({type:'Q',payload:data})
      }
      catch(e){
            alert("Questions Loading failed try again!!")
      }
}

export const postAnswer=(id,answerData)=> async(dispatch)=>{
      
      try{
            const {data}= await api.postAnswer(id,answerData);
            dispatch({type:'POST_ANSWER',payload:data})
            dispatch(fetchAllQuestions())
      }
      catch(e){
            alert("posting failed try again!!")
      }
}

export const deleteQuestion=(id,navigate)=> async(dispatch)=>{
      try{
            await api.deletedQuestion(id);
            dispatch(fetchAllQuestions())
            navigate("/")
      }
      catch(e){
            alert("delete failed try again!!")
      }
}

export const deleteAnswer=(id,answerData)=> async(dispatch)=>{
     try{
            await api.deleteAnswer(id,answerData);
            dispatch(fetchAllQuestions());
     }
     catch(e){
           alert("delete failed try again!!")
     }
}

export const voteQuestion=(id,value,userId)=> async(dispatch)=>{
      try{
            await api.voteQuestion(id,value,userId);
            dispatch(fetchAllQuestions())
      }
      catch(e){
            alert("Voting failed try again!!")
      }
}