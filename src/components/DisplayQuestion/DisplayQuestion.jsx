import {React,useState} from 'react'
import {useParams, Link, useNavigate, useLocation} from 'react-router-dom'
import up_icon from '../../assets/sort-up.svg'
import down_icon from '../../assets/sort-down.svg'
import "./DisplayQuestion.css"
import Avtar from "../Avtar/Avtar"
import DisplayAnswers from '../DisplayAnswers/DisplayAnswers'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question.js'
import moment from 'moment'
import copy from 'copy-to-clipboard'

export default function DisplayQuestion() {
  const user=useSelector((state)=>state.currentUserReducer)
  const questionList=useSelector((state)=>state.questionReducer)
  const {id} = useParams()
  const [answerBody, setanswerBody] = useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=(e,noOfAnswers)=>{
    e.preventDefault(0);
    if(user===null){
      alert("login/Signup to answer a question!!")
      navigate('/auth')
    }
    if(answerBody===""){
      alert("Enter an Answer before submitting!!")
    }
    else{
      try{dispatch(postAnswer(id,{noOfAnswers:noOfAnswers+1,answerBody,userAnswered:user.result.name,userId:user.result._id}));}
      catch(e){
        alert("posting failed try again")
      }
      document.getElementById("ans_body").value=""
    }
  }
  const handleDelete=()=>{
      if(!user){
        alert("Login/Sigup first to vote")
        navigate("/auth")
      }
      else
      {dispatch(deleteQuestion(id,navigate))}
  }

  const handleUp=()=>{
    if(!user){
      alert("Login/Sigup first to vote")
      navigate("/auth")
    }
    else{
      dispatch(voteQuestion(id,'up',user.result._id))
    }
  }

  const handleDown=()=>{
    dispatch(voteQuestion(id,'down',user.result._id))
  }

  const url="http://localhost:3000"
  const location = useLocation();
  const handleShare=()=>{
    copy(url+location.pathname)
    alert("Copied URL: "+url+location.pathname)
  }

  return (
    <div className='question-details'>
      {
        questionList.data === null?
        <h1>Loading....</h1>:
        <>
          {
            questionList.data.filter((ques) => ques._id === id).map((que) => (
              <div key={que._id}>
                <section className='question-details-container-1'>
                  <h1>{que.questionTitle}</h1>
                  <div className='question-details-container-2'>
                    <div className='question-votes'>
                      <img src={up_icon} alt="Up" width="18px" className='votes-icon' onClick={handleUp}/>
                      <p>{que.upVotes.length-que.downVotes.length}</p>
                      <img src={down_icon} alt="Down" width="18px" className='votes-icon' onClick={handleDown}/>
                    </div>
                    <div style={{width:"100%"}}>
                      <p className='question-body'>{que.questionBody}</p>
                      <div className="question-details-tags">
                        {
                          que.questionTags.map(tag => (
                            <p key={tag}>{tag}</p>
                          ))
                        }
                      </div>
                      <div className="action-user">
                        <div>
                          <button type='button' onClick={handleShare}>Share</button>
                          {
                            user?.result?._id===que?.userId && 
                            <button type='button' onClick={handleDelete}>Delete</button>
                          }
                        </div>
                        <div>
                          <p>asked {moment(que.askedOn).fromNow()}</p>
                          <Link to={`/users/${que.userId}`} className="user-link">
                            <Avtar color="white"  backgroundColor="orange" px="8px" py="5px">{que.userPosted.charAt(0).toUpperCase()}</Avtar>
                            <div>
                              {que.userPosted}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {
                  que.noOfAnswers!==0 && (
                    <section> 
                      <h1>{que.noOfAnswers} answers</h1>
                      <DisplayAnswers question={que} handleShare={handleShare}/>
                    </section>
                  )
                }
                <section className='post-ans-container'>
                  <h1>Your Answer</h1>
                  <form onSubmit={(e)=>{handleSubmit(e,que.noOfAnswers)}}> 
                    <textarea name="ans_body" id="ans_body" cols="30" rows="10" onChange={(e)=>setanswerBody(e.target.value)}></textarea>
                    <input type="submit" name="ans_btn" id="ans_btn" className='post-ans-btn' value="Post Your Answer" />
                  </form>
                  <p>
                    Browse other Question tagged
                    {
                      que.questionTags.map(tag=>(
                        <Link to="/tags" className='ans-tags' key={tag}>{tag}</Link>
                      ))
                    } 
                    or 
                    {
                      <Link to="/ask_question" style={{color:"#009dff", textDecoration:"none"}}> ask your question</Link>
                    }
                  </p>
                </section>
              </div>
            )) 
          }
        </>
      }
    </div>
  )
}
