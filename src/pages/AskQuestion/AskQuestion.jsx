import {React,useState} from "react";
import "./AskQuestion.css";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import {askQuestion} from "../../actions/question";

export default function AskQuestion() {
  const [questionTitle, setquestionTitle] = useState("")
  const [questionBody, setquestionBody] = useState("")
  const [questionTags, setquestionTags] = useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const User=useSelector((state)=>(state.currentUserReducer))

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User.result._id},navigate))
    e.target.value=""
  }

  const handleEnter=(e)=>{
    if(e.key==="Enter"){
      setquestionBody(questionBody+"\n")
    }
  }

  return (
    <div className="ask-ques">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(e)=>{setquestionTitle(e.target.value)}}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the question someone would need to answer your
                question
              </p>
              <textarea id="ask-ques-body" onChange={(e)=>{setquestionBody(e.target.value)}}
              onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={(e)=>{setquestionTags(e.target.value.split(" "))}}
              />
            </label>
          </div>
          <input type="submit" className="submit-btn" value="Review your question"  />
        </form>
      </div>
    </div>
  );
}
