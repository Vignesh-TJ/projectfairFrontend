import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { allUserProjectApi, removeUserProjectApi } from '../service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext} from '../context/ContextShare'
import { ToastContainer, toast } from 'react-toastify';

function Myprojects() {

    const [userProject,setUserProject]=useState([])
    const {addResponse}=useContext(addResponseContext)
    const [deleteStatus,setDeleteStatus]=useState({})


    const getUserProject =async()=>{
         if(sessionStorage.getItem("token")){
              const token =sessionStorage.getItem("token")
              console.log(token)
              const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }
              const result=await allUserProjectApi(reqHeader)
              // console.log(result.data);
              setUserProject(result.data)
              console.log(result.data)
              
            }
}


    useEffect(()=>{
        getUserProject()
    },[addResponse,deleteStatus])

    const handleDelete= async (id)=>{
      if(sessionStorage.getItem("token")){
        const token =sessionStorage.getItem("token")
        console.log(token)
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result=await removeUserProjectApi(id,reqHeader)
        console.log(result)
      
        if(result.status ==200){
          setDeleteStatus(result)
          toast.success("project deleted successfully")
        }
        else{
         toast.warning("something went wrong")
        }
        
      }

    }

  return (
   <>
   <div className='p-5 shadow'>

      <div className="d-flex justify-content-between">
        <h4 className='text-success'>My Project</h4>
        <Addproject/>
        
      </div>
      
   {userProject?.length>0 ?
   userProject?.map((item)=>(
    <div className="p-3 bg-secondary rounded mt-3 d-flex align-items-center justify-content-between">
    <h5>{item.title}</h5>
    <div className='d-flex'>
        <Edit project={item}/>
      <Link to={item.github} target='_blank'>  <FontAwesomeIcon className='me-4 text-warning fa-xl' icon={faGithub} /></Link>
      <Link to={item.website} target='_blank'>  <FontAwesomeIcon className='me-4 text-success fa-xl' icon={faGlobe} /></Link>
        <FontAwesomeIcon onClick={()=>handleDelete(item?._id)} className='me-4 text-danger fa-xl' icon={faTrash} />
    </div>
</div>

  )) :
  <div>
    <h1></h1>
  </div>
     }
  


   </div>
          <ToastContainer position='top-center' autoClose={2000} theme="colored" />
   
   </>
  )
}

export default Myprojects