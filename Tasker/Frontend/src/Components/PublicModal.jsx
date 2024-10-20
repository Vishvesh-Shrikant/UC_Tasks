import React,{ useState , useEffect} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
  } from '@chakra-ui/react'

import {motion, useAnimationControls} from 'framer-motion'
import api from '../api/AxiosApi'



const containerVariants={
  close:{
      transform:'translateX(100%)',
      transition:{
          type: "spring",
          ease:"linear",
          duration:0.6
      }
  },
  open:{
      transform:'translateX(0%)',
      transition:{
          type: "spring",
          ease:"linear",
          duration:0.6
      }
  }
}

const PublicModal = ({openPbc, onClosePbc}) => {
    const [modalStatus, setModalStatus]= useState("Create")// or "Join"
    const containerControls= useAnimationControls()

    useEffect(()=>{
      if(modalStatus==="Create")
      {   
          containerControls.start("open")
      }
      else
      {
          containerControls.start("close")
      }
          
  }, [modalStatus])

  return (
    <Modal
        size={"xl"}
        isCentered
        isOpen={openPbc}
        onClose={onClosePbc} 
        motionPreset='slideInBottom'
    >
        <ModalOverlay />
        <ModalContent backgroundColor={"#2B2C28"} textColor={"#EEEEEE"}>
            <ModalHeader>Create/Join Public Team</ModalHeader>
            <ModalCloseButton />

            <div className='mx-6 w-2/3 flex items-center rounded-md relative text-xl font-medium font-Raleway border'>
              <button className='py-1 w-1/2 h-full rounded-l-md z-10' onClick={()=>{
                setModalStatus("Create")
              }}>Create </button>
              <button className=' py-1 w-1/2 h-full rounded-r-md z-10' onClick={()=>{
                setModalStatus("Join")
              }}> Join</button>
              <motion.div className={`w-1/2 h-full rounded-md absolute  ${modalStatus==="Create"?'bg-[#FF8427]':'bg-[#4ECDC4]'}`}
              variants={containerVariants}
              animate={containerControls}></motion.div>
            </div>
            {
              modalStatus==="Create" ?
              <>
                <CreateModal onClosePbc={onClosePbc}/> 
              </>:
              <>
                <JoinModal onClosePbc={onClosePbc}/>
              </>
            }
        </ModalContent>
    </Modal> 
  )
}

const CreateModal=({onClosePbc})=>{
    const [teamName, setTeamName]=useState("")
    const [teamDescription, setTeamDescription]= useState("")
    const toast= useToast({position:'top'})

    const handleCreateTeam=()=>{
      
      api.post('/user/publicTeam/create', {name:teamName, description:teamDescription},{
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        if(res.data.success)
        {
          toast({
            title: 'New Team Created',
            description: "Your new team has been created.",
            status: 'success',
            duration: 1500,
            isClosable: true,
        })
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }

  return(
    <>
        <ModalBody>
          <FormControl>
            <FormLabel>Team Name</FormLabel>
            <Input placeholder='Team Name...' onChange={e=>setTeamName(e.target.value)} className='mb-4'/>
            <FormLabel>Team Description</FormLabel>
            <Input placeholder='Team Description...' onChange={e=>setTeamDescription(e.target.value)} className='mb-4'/>
          </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button bgColor="#FF8427" mr={3} onClick={()=>{
              handleCreateTeam()
              onClosePbc()
            }}>
              Save
            </Button>
            <Button onClick={onClosePbc}>Cancel</Button>
        </ModalFooter>
    </>
  )
}


const JoinModal=({onClosePbc})=>{

  const [teamCode, setTeamCode]= useState()
  const toast= useToast({position:'top'})

  const handleJoinTeam=()=>{
    api.post('/user/publicTeam/join', {teamcode:teamCode},{
      headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    })
    .then(res=>{
      console.log(res)
      if(res.data.success)
      {
        toast({
          title: 'New Team Joined',
          description: "You have joined your new team.",
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return(
    <>
        <ModalBody>
          <FormControl>
            <FormLabel>Team Code</FormLabel>
            <Input placeholder='Team Code...' onChange={e=>setTeamCode(e.target.value)} className='mb-4'/>
            
          </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button bgColor="#4ECDC4" mr={3} onClick={()=>{
              handleJoinTeam()
              onClosePbc()
            }}>
              Save
            </Button>
            <Button onClick={onClosePbc}>Cancel</Button>
        </ModalFooter>
    </>
  )
}




export default PublicModal

/*
<FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input placeholder='First name' />
                    </FormControl>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input  placeholder='First name' />
                    </FormControl>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input placeholder='First name' />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Last name</FormLabel>
                      <Input placeholder='Last name' />
                    </FormControl>
*/