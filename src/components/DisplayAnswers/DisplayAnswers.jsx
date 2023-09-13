import React from "react";
import Avtar from "../Avtar/Avtar"
import { Link } from "react-router-dom";
import "../DisplayQuestion/DisplayQuestion.css"
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/question";

export default function DisplayAnswers({ question, handleShare}) {
      const user=useSelector((state)=>state.currentUserReducer)
      const id=question._id;
      const dispatch=useDispatch()
      const handleDelete=(e, answerId ,noOfAnswers)=>{
            dispatch(deleteAnswer(id,{answerId, noOfAnswers:noOfAnswers-1}))
      }
  
  return (
    <div>
      {
            question.answer.map(ans => (
            <div className="display-ans" key={ans.answeredOn}>
                  <p>{ans.answerBody}</p>
                  <div className="action-user">
                        <div>
                        <button type="button" onClick={handleShare}>Share</button>
                        {
                              ans?.userId===user?.result?._id &&(
                                    <button type="button" onClick={(e)=>handleDelete(e,ans._id,question.noOfAnswers)}>Delete</button>
                              )
                        }
                        </div>
                        <div>
                        <p>answered {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/users/${ans.userId}`} className="user-link">
                        <Avtar
                              color="white"
                              backgroundColor="green"
                              px="8px"
                              py="5px"
                        >
                              {ans.userAnswered.charAt(0).toUpperCase()}
                        </Avtar>
                        <div>{ans.userAnswered}</div>
                        </Link>
                        </div>
                  </div>
            </div>
            ))
      }
    </div>
  );
}
