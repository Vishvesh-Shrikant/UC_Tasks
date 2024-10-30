import React, { useContext, useState } from 'react'
import { Plus } from 'lucide-react';
import api from '../api/AxiosApi'
import { 
  useToast, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input, 
  FormLabel,
  FormErrorMessage, 
  Button
} from '@chakra-ui/react';
import {motion} from 'framer-motion'


const AddTasks = ({column, setTasks, teamId, headingColor, title}) => {
    const [taskName, setTaskName]= useState('')
    const [taskDescription, setTaskDescription]= useState('')
    const [adding, setAdding]= useState(false)
    const [isError, setIsError]= useState(false)
    const toast= useToast({position:'top'})




    const handleSubmit=(e)=>{
        e.preventDefault();
        setTaskDescription(taskDescription.trim())
        setTaskName(taskName.trim())

        if(taskName===''|| taskDescription==='')
        {
          setIsError(true)
          console.log(err)
          setTaskName('')
          setTaskDescription('')
        }
        else
        {
            setIsError(false)
            api.post(`/user/${teamId}/task/create`,{
                taskName:taskName,
                taskDescription:taskDescription,
                status:column 
            },{
                headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
            })
            .then(res=>{
                console.log(res)
                toast({
                    title: 'Task created.',
                    description: "The task has been created successfully ",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                setTaskName('')
                setTaskDescription('')
                setAdding(false)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const addNewtaskModal=()=> {
      setAdding(true)
      setIsError(false)
    }
    const closeNewTaskModal=()=> {
      setAdding(false)
      setIsError(false)
    }

    

  return (
    <>
      <motion.button
      layout
      className='flex text-base font-medium text-white w-full items-center gap-1.5 px-3 py-1.5 '
      onClick={addNewtaskModal}> 
        <span>Add Tasks</span>
        <Plus/>
      </motion.button>
      {
        adding &&
        (
          <Modal
            size={"xl"}
            isCentered
            isOpen={addNewtaskModal}
            onClose={closeNewTaskModal} 
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
              <ModalContent backgroundColor={"#2B2C28"} textColor={"#EEEEEE"}>
                  <ModalHeader>New {title} Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <FormControl isInvalid={isError} className='font-Raleway' onSubmit={handleSubmit}>
                    <FormLabel className={`${headingColor}`} fontSize='larger'>Team Name</FormLabel>
                    <Input placeholder='Task name' 
                    onChange={e=>{
                      setTaskName(e.target.value)
                      setIsError(false)
                    }}
                    className={`${isError? 'mb-1': 'mb-4'}`}/>
                    {
                      (isError && taskName==='') &&
                      <FormErrorMessage className='mb-3'>Task Name cannot be empty</FormErrorMessage>
                    }
                    <FormLabel className={`${headingColor}`} fontSize='larger'>Team Description</FormLabel>
                    <Input placeholder='Task Description Description...' 
                    onChange={e=>{
                      setTaskDescription(e.target.value)
                      setIsError(false)}} 
                      className={`${isError? 'mb-1': 'mb-4'}`}/>
                    {
                      (isError && taskDescription==='') &&
                      <FormErrorMessage className='mb-3'>Task Description cannot be empty</FormErrorMessage>
                    }

                    <Button 
                    bgColor={`${headingColor.slice(6, headingColor.length-1)}`} 
                    _hover={{bg:`${headingColor.slice(6, headingColor.length-1)}`, opacity:'0.9'}}
                    className='rounded-md mr-3 w-1/4 p-2 text-xl font-Raleway' onClick={handleSubmit}>
                      Save
                    </Button>
                  </FormControl>

                  </ModalBody>
              </ModalContent>
          </Modal> 
  
        )
      }
    </>
  )
}

export default AddTasks