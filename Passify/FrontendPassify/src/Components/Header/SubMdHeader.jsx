import React, { useState , useContext} from 'react'
import UserContext from '../../context/UserContext'
import { motion} from "framer-motion";
import {NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };



export const Navs=({linkto, title, handleClick})=>{
  return(
    <NavLink to={`/${linkto}`} className={({isActive})=>`my-2 relative transition duration-300 ease-in-out after:transition  after:duration-300 after:ease-in-out ${isActive?'after:content-[""] after:w-2/3 after:absolute after:h-[0.13rem] after:bg-textColour after:bottom-0 text-textColour after:left-0' : 'hover:after:content-[""] hover:after:w-2/3 hover:after:absolute hover:after:h-[0.13rem] hover:after:bg-textColour hover:after:bottom-0 hover:after:left-0 text-textColour/80 hover:text-textColour' }`}onClick={handleClick}>
    {title}
    </NavLink>
  )
}
const SubMdHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick=()=>{
    setIsOpen(false)
  }
  const {loggedin, logout} = useContext(UserContext)
  return (
    <>
      <motion.nav
      className="relative w-full flex justify-end items-end"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      >
        {/*ME NU BUTTON */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          >
          <motion.div
            variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
            }}
            transition={{ duration: 0.3 }}
            style={{ originY: 0.55 }}
          >
            <MenuIcon/>
          </motion.div>
        </motion.button>

        <motion.ul
          className='flex flex-col justify-between items-start absolute top-full right-0 my-10 z-20 bg-[#FCFCFC] w-3/4 max-sm:w-full p-10 border-2 border-black rounded-2xl '
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              }
            }
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li variants={itemVariants} className='my-2'>
            <Navs linkto="" title="Home" handleClick={handleClick}/>
          </motion.li>
          <motion.li variants={itemVariants} className='my-2'>
            <Navs linkto="create" title="Create" handleClick={handleClick}/>
          </motion.li>
          <motion.li variants={itemVariants} className='my-2'>
            <Navs linkto="view" title="View" handleClick={handleClick}/>
          </motion.li>
          {
                !loggedin &&
                (
                  <motion.li variants={itemVariants} className='my-2'>
                    <Navs linkto="signup" title="Login/Sign Up" handleClick={handleClick}/>
                  </motion.li>
                )
          }
          {
                loggedin &&
                (
                  <motion.li variants={itemVariants} className='my-2'
                  onClick={logout}>
                    <Navs linkto="" title="Logout" handleClick={handleClick}/>
                  </motion.li>
                )
          }
        </motion.ul>
      </motion.nav>
    </>
  )
}

export default SubMdHeader
