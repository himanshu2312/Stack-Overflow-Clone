import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './MainBar.css'
import { useSelector } from 'react-redux'
import QuestionList from './QuestionList'

export default function MainBar() {
  const user=useSelector((state) => (state.currentUserReducer));
  const questionList= useSelector((state) =>(state.questionReducer));

  const doAlert=()=>{
    if(user===null){
      alert("Login/SignUp first to ask a question")
    }
  }

  return (
    <div className='mainbar'>
      <div className="mainbar-header">
        {
          useLocation().pathname==="/"?
          <h1>Top Questions</h1>:
          <h1>All Questions</h1>
        }
        <Link to={user===null?"/auth":"/ask_question"} onClick={doAlert} className='ask-btn'>Ask Question</Link>
      </div>
      {
        questionList.data===null?
        <h1>Loading...</h1>:
        <div>
          <p>{questionList.data.length} questions</p>
          <QuestionList questionList={questionList.data}/>
        </div>
      }
    </div>
  )
}
