import axios from 'axios'
import React,{useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const SinglePass = () => {
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [tag, setTag]=useState("")
    const [err, setErr]=useState(false)

    const {viewpw}=useContext(UserContext)
    const navigate=useNavigate()
    const discard=()=>{
        navigate('/view')
    }
    const getPassData=()=>{
        axios.get(`http://localhost:5001/view/${viewpw}`)
        .then(res=>{
            console.log(res.data)
            setName(res.data.name)
            setPassword(res.data.password)
            setTag(res.data.tags)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const updatePass=()=>{
        setErr(false)
        if(!name || !password)
        {
            setErr(true)
        }
        else
        {
            axios.put(`http://localhost:5001/update/${viewpw}`,{
                name, password, tag
            })
            .then(res=>{
                console.log(res)
                alert("Password Updated")
            })
            .catch(err=>{
                console.log(err)
            })
            navigate('/view')
        }
      }

    useEffect(()=>{
        getPassData()
    }, [])

  return (
    <div className='flex flex-col justify-center items-start bg-[#FCFCFC] rounded-2xl w-3/5 max-md:w-4/5'>
        <div className='h-full bg-[#605F5E] justify-center items-end w-full rounded-t-2xl sm:px-10 px-4 py-3 text-lg font-semibold'>
            <p>Edit Password Password</p>
        </div>
        <div className='flex-col flex justify-center items-start sm:px-10 px-4 py-6 w-full'>
            <div className='w-full flex flex-col justify-between items-start my-2'>
                <label className='text-lg font-semibold'> Name<span className='text-[#FB3640] text-xs pb-3'>*</span></label>
                <input type='text' placeholder='Enter name' className='outline-none border border-textColour p-2 w-full rounded-lg' value={name} onChange={e=> setName(e.target.value.trim())}/>
                {
                    err && !name &&
                    (
                        <div>
                            <p className='text-[#FB3640]'>*Cannot leave field empty *</p>
                        </div>
                    )
                }
            </div>
            <div className='w-full flex flex-col justify-between items-start my-2'>
                <label className='text-lg font-semibold'> Password<span className='text-[#FB3640] text-xs pb-3'>*</span></label>
                <input type='text' placeholder='Enter name' className='outline-none border border-textColour p-2 w-full rounded-lg' value={password} onChange={e=>setPassword(e.target.value.trim())}/>
                {
                    err && !password &&
                    (
                        <div>
                            <p className='text-[#FB3640]'>*Cannot leave field empty *</p>
                        </div>
                    )
                }

            </div>
            <div className='w-full flex flex-col justify-between items-start my-2'>
                <label className='text-lg font-semibold'> Tags <span className='text-sm font-normal'>(optional)</span>:</label>
                <input type='text' placeholder='Enter name' className='outline-none border border-textColour p-2 w-full rounded-lg' value={tag} onChange={e=>setTag(e.target.value.trim())}/>
            </div>
        </div>
        <div className='flex justify-between items-center sm:px-10 px-4 pb-3 w-full'>
            <button className='bg-[#FB3640] w-1/4 max-sm:w-2/5 border-textColour py-2 rounded-xl font-semibold text-lg'
            onClick={discard}>Discard</button>
            <button className='bg-yellow-400 w-1/4 max-sm:w-2/5 border-textColour py-2 rounded-xl font-semibold text-lg'
            onClick={updatePass}> Update</button>
        </div>
    </div>
  )
}

export default SinglePass