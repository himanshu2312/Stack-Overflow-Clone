import React from 'react'
import {useSelector} from 'react-redux'
import User from './User'
import "./Users.css"

export default function Users() {
  const users=useSelector((state)=>state.usersReducer)
  return (
    <>
      <h1>Users</h1>
      <div className='user-list-container'>
        {
          users?.map((user)=>(
              <User user={user} key={user._id}/>
            ))
        }
      </div>
    </>
  )
}
