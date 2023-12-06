import React from 'react'
import { useLocation } from 'react-router-dom'

export default function AssignmentSection() {
    const location = useLocation()
   const assignmentCurrent = location.state?.assignment
  return (
    <div>
      <h1 className='text-[25px] pb-2'>{assignmentCurrent?.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: assignmentCurrent?.description }} />
    </div>
  )
}
