import React from 'react'
import "../../components/MainBar/MainBar.css"
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Questions({que}) {
  return (
    <div className='display-que'>
      <div className="display-que-votes">
        <p>{que.upVotes.length-que.downVotes.length}</p>
        <p>votes</p>
      </div>
      <div className="display-que-ans">
        <p>{que.noOfAnswers}</p>
        <p>answers</p>
      </div>
      <div className="display-que-details">
        <Link to={`/questions/${que._id}`} className="title-link">{que.questionTitle}</Link>
        <div className="que-tag-time">
          <div className="display-tags">
            {
              que.questionTags.map(
                (tag,ind) => 
                (
                  <p key={ind}>{tag}</p>
                )
              )
            }
          </div>
          <div className='display-time'>
              <p>asked {moment(que.askedOn).fromNow()} by {que.userPosted}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
