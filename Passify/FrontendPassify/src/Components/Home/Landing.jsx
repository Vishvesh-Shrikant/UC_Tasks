import React from 'react'
import {Typewriter} from 'react-simple-typewriter'

const Landing = () => {
  return (
    <>
        <div className='h-full w-full flex flex-col justify-center items-center text-[#FCFCFC] font-texts'>
            <p className=' text-[6rem] underline'> PASSIFY </p>
            <p className='w-2/3 text-center text-lg'>An easy to use Password manager that allows the user to store your passwords. each ouser can login using their credentials on which he/she can access , create , edit and delete their passwords </p>

            <div className=' flex justify-center items-center w-3/4 my-8'>
                <a href='https://www.instagram.com/djunicode/?img_index=1' target='_blank'
                className=' rounded-full w-14 h-14 bg-[#FCFCFC] mx-5 flex justify-center items-center'>
                  <img src="https://cdn.pixabay.com/photo/2021/06/15/12/14/instagram-6338393_1280.png" className='rounded-full p-1'></img>
                </a>

                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'  target='_blank'
                className=' rounded-full w-14 h-14 bg-[#FCFCFC] mx-5 flex justify-center items-center'>
                  <img src="https://w7.pngwing.com/pngs/454/683/png-transparent-round-youtube-logo-thumbnail.png" className=' rounded-full p-1'></img>
                </a>
            
                <a href='https://github.com/Vishvesh-Shrikant' target='_blank'
                className=' rounded-full w-14 h-14 bg-[#FCFCFC] mx-5 flex justify-center items-center'>
                  <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" className=' rounded-full p-1'></img>
                </a>
            </div>

            <div className='flex justify-evenly items-center my-5 w-full'>
              <div className=' h-96 rounded-3xl'>
                <img src='https://img.freepik.com/premium-vector/hand-is-holding-smartphone-with-lock-icon-screen-data-protection_532800-136.jpg' className='h-full rounded-3xl bg-[#FCFCFC] p-2'/>
              </div>
              <div className='text-6xl w-1/2'>
                <Typewriter 
                words={["Create password", "View password", "Edit password", " Delete password"]} 
                loop={false}
                cursor 
                cursorBlinking={true}
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={70}
                delaySpeed={1200}/>
              </div>
              
            </div>

        </div>

    </>
  )
}

export default Landing