import React from 'react'

export default function ProfileBio({data}) {
  return (
      <div>
            <div>
                  {
                    data?.tags?.length!==0?
                    <>
                    <h4>Tags watched</h4>
                    {
                        data?.tags?.map((tag,index)=>(
                              <p key={index}>{tag}</p>
                        ))
                    }
                  </>:
                  <p>0 tags watched</p>
                  }
            </div>
            <div>
                  {
                        data?.about?
                        <>
                        <h4>About</h4>
                        <p>{data?.about}</p>
                        </>:
                        <p>No bio found</p>
                  }
            </div>
      </div>
  )
}
