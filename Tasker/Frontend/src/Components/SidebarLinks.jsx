import React from 'react'
import { motion , AnimatePresence} from 'framer-motion'
import { ChevronRight } from 'lucide-react';


const SidebarLinks = ({children, name, isOpen, setIsOpen, setSelectedProject, textColour}) => {

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
        <div className={`rounded cursor-pointer hover:bg-neutral-500/50 flex flex-row justify-center items-center place-items-center transition-colors duration-100 font-medium ${textColour}`} onClick={handleClick}>
            {children}
            <AnimatePresence>
              {isOpen && (
                <>
                <motion.p className={`text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                    {name}
                </motion.p>
                <motion.p className={`text-lg whitespace-nowrap overflow-clip tracking-wide mx-1 text-inherit ease-in-out duration-150`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                    <ChevronRight/>
                </motion.p>
              </>
              )}
            </AnimatePresence>
        </div>
    </>
  )
}

export default SidebarLinks