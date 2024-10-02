import { useNavigate} from 'react-router-dom'
import React from 'react'


const RouteLinks = ({id, teamname, setIsOpen , setSelectedProject}) => {
    const navigate= useNavigate()
    const handleClick=()=>{
        setIsOpen(prev=> !prev)
        setSelectedProject(null)
        setTimeout(()=>{
            navigate(`/user/teams/${id}`)
        }, 500)
    }

  return (
    <div className='hover:bg-neutral-700 ease-in-out duration-200 rounded p-1 w-full cursor-pointer' onClick={handleClick}>
        <p>{teamname}</p>
    </div>
  )
}

export default RouteLinks