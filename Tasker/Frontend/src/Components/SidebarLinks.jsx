import React from 'react'
import { motion , AnimatePresence} from 'framer-motion'



const SidebarLinks = ({children, name, isOpen,selectedProject, setIsOpen, setSelectedProject}) => {

  const handleClick = () => {
    setSelectedProject(null)
    if(!isOpen)
      setIsOpen(prev=>!prev)
    setTimeout(() => {
        setSelectedProject(name)
    }, 250)
  }
  
  return (
    <>
        <div className='rounded cursor-pointer hover:bg-neutral-500/50 text-white flex flex-row justify-center items-center place-items-center transition-colors duration-100' onClick={handleClick}>
            {children}
            <AnimatePresence>
              {isOpen && (
                <motion.p className='text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                    {name}
                </motion.p>
              )}
            </AnimatePresence>
        </div>
    </>
  )
}

export default SidebarLinks