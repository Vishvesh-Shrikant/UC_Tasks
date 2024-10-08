import React from 'react'
import axios from 'axios'
import  { useState } from 'react'


const CreateBox = ({user}) => {

    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [tag, setTag]=useState("")
    const [err, setErr]=useState(false)

    const creatorId= user._id

    const submit=(e)=>{
        setErr(false)
        if(!name || !password ){
            setErr(true)
            return console.log();
        }

        axios.post('http://localhost:5001/create', {
           creatorId, name, password, tag
        })
        .then(res=>{
            setName("")
            setPassword("")
            setTag("")
            console.log(res)
            alert("New Password Added")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    
    const clear=()=>{
        setErr(false)
        setName("")
        setPassword("")
        setTag("")
    }



  return (
    <div className='flex flex-col justify-center items-start bg-[#FCFCFC] rounded-2xl w-3/5 max-md:w-4/5'>
        <div className='h-full bg-[#605F5E] justify-center items-end w-full rounded-t-2xl px-10 py-3 text-lg font-semibold'>
            <p>Create Password</p>
        </div>
        <div className='flex-col flex justify-center items-start sm:px-10 max-sm:p-4 py-6 w-full'>
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
                <input type='text' placeholder='Enter password' className='outline-none border border-textColour p-2 w-full rounded-lg' value={password} onChange={e=>setPassword(e.target.value.trim())}/>
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
                <input type='text' placeholder='Enter tag' className='outline-none border border-textColour p-2 w-full rounded-lg' value={tag} onChange={e=>setTag(e.target.value.trim())}/>
            </div>
        </div>
        <div className='flex justify-between items-center sm:px-10 max-sm:p-4 pb-3 w-full'>
            <button className='bg-[#FB3640] w-1/4 max-md:w-2/5 border-textColour py-2 rounded-xl font-semibold text-lg'
            onClick={clear}>Clear</button>
            <button className='bg-[#63C132] w-1/4 max-md:w-2/5 border-textColour py-2 rounded-xl font-semibold text-lg'
            onClick={()=>submit()}> Submit</button>
        </div>
    </div>
  )
}

export default CreateBox