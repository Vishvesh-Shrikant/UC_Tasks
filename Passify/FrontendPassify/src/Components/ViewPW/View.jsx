import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [passData, setPassData]=useState([])

  const {setViewpw}= useContext(UserContext)
  const navigate=useNavigate()


  const getData=()=>{
    axios.get('http://localhost:6001/view')
    .then(res=>{ 
      setPassData(res.data)
    })
    .catch(err=>
      console.log(err)
    )
  }

  const deletePass=(name)=>{
    axios.delete(`http://localhost:6001/delete/${name}`)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }



  useEffect(()=>{
    getData()
  },[deletePass])

  return (
      <div className='flex flex-col justify-between items-start font-texts text-[#FCFCFC] w-full px-10'>
        <p className='text-3xl font-semibold'>View Your Passwords:</p>

        <div className='grid grid-cols-3 gap-8  text-textColour w-full my-10'>

            {
                passData && passData.map((pass)=>(
                  <div className='flex items-start justify-center bg-[#FCFCFC] p-5 rounded-2xl cursor-pointer' key={pass._id}>
                    <div className='flex flex-col justify-between items-start w-full' 
                    onClick={()=>{
                      setViewpw(pass._id)
                      console.log(pass._id)
                      navigate(`/view/${pass.name}`)
                    }}>
                      <p className='text-xl font-semibold'>{pass.name}</p>
                      <p className='text-lg text-textColour font-medium'>{pass.tags}</p>
                    </div>
                    
                    <div className='flex justify-center items-center text-[#fcfcfc]'>
                          <div className='bg-yellow-400 p-1 rounded-full mx-1 cursor-pointer'
                          onClick={()=>{
                            setViewpw(pass._id)
                            console.log(pass._id)
                            navigate(`/view/${pass.name}`)
                          }}><EditIcon/></div>
                          <div className='bg-[#FB3640] p-1 rounded-full mx-1 cursor-pointer'
                          onClick={()=>{deletePass(pass.name)}}
                          ><DeleteIcon/></div>
                      </div>
                  </div>
                )) 
          }
        </div>
    </div>
  )
}

export default View