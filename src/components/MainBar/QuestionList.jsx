import React from 'react'
import Questions from "./Questions"

export default function QuestionList({questionList}) {
  return (
    <>
      { 
        questionList.map((q)=>(
          <Questions que={q} key={q._id}/>
        ))
      }
    </>
  )
}
