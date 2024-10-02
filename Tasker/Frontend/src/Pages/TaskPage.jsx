import React from 'react'
import { CustomKanban } from '../Components/Kanban'

const TaskPage = () => {
  return (
    <div className='ml-20 py-10 px-5 overflow-x-scroll'>TaskPage
      <CustomKanban/>
    </div>
  )
}

export default TaskPage