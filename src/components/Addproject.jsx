import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import { addResponseContext } from '../context/ContextShare';
function Addproject() {
    const [show, setShow] = useState(false);
    const {setAddResponse}=useContext(addResponseContext)
const [preview,setPreview]=useState("")
const [projectDetails,setProjectDetails]=useState({
  title:"",
  language:"",
  github:"",
  website:"",
  overview:"",
  projectImage:""
})
const [token,setToken]=useState("")
console.log(token)
console.log(projectDetails)
const [key,setKey]=useState(1)

    const handleClose = () => {setShow(false)
      handleCancel()
    };
    const handleShow = () => setShow(true);

const handlefile=(e)=>{
  console.log(e.target.files);
  setProjectDetails({...projectDetails,projectImage:e.target.files[0]})
  
}

useEffect(()=>{
  if(projectDetails.projectImage){
   setPreview(URL.createObjectURL(projectDetails.projectImage))
  }
},[projectDetails.projectImage])
 
const handleCancel =()=>{
  setProjectDetails({
    title:"",
  language:"",
  github:"",
  website:"",
  overview:"",
  projectImage:""

  })
  setPreview("")
  // key attribute when a value of key attribute changes onchange evnet calls /invokes
  if(key==1){
    setKey(0)
  }
  else{
    setKey(1)
  }
}

const handleAdd =async()=>{
  const {title,language,github,website,overview,projectImage}=projectDetails
  if(!title || !language || !github || !website || !overview || !projectImage){
  toast.info("fill the form completely")
  }
  else{
        // append()- to create reqHeader
    // if the request contains upload content the request body should be created with the help of th eappend method,present in the form data class. request body should be a form data
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("website",website)
    reqBody.append("github",github)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
  
if(token){
  const reqHeader = {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  
  const result =await addProjectApi(reqBody,reqHeader)
  console.log(result)
  if(result.status==200){
    toast.success('project added successfully')
    setTimeout(()=>{
      handleClose()
    },2000)
    setAddResponse(result)
  }
  else if(result.status==406){
    toast.warning(result.response.data)
    handleCancel()
  }
  else{
    toast.error('something went wrong')
    handleCancel()
  }

}else{
  toast.warning("please login")
}

  }
}

useEffect(()=>{
  if(sessionStorage.getItem("token"))
  {
    setToken(sessionStorage.getItem("token"))
  }
},[])
  return (
   <>
<button onClick={handleShow} className='btn btn-success rounded-0'>Add Project</button>
<Modal show={show} onHide={handleClose} animation={false} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>

 <div className="container">
    <div className="row">
        <div className="col-md-6">
            
               <label htmlFor='name'>
               <img src={preview?preview:"https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Pic.png" }  className='w-100' alt="" />
                <input id='name' className='d-none'key={key} type="file" onChange={(e)=>handlefile(e)}/>
          
               </label>
               
            {/* <input type="file"  className='d-none'  /> */}

        </div>
        <div className="col-md-6">
            <div>
                <input type="text" placeholder='Title' value={projectDetails.title} onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} className='form-control p-2 my-3' />
            </div>
            <div>   <input type="text" value={projectDetails.language} onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}} placeholder='Language' className='form-control p-2  my-3 ' /></div>
            <div>    <input type="text" value={projectDetails.github} onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}} placeholder='Github' className='form-control p-2  my-3' /></div>
            <div>    <input type="text" value={projectDetails.website} onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}} placeholder='Website' className='form-control p-2  my-3' /></div>
            <div>
                <textarea row={5} value={projectDetails.overview} onChange={(e)=>{setProjectDetails({...projectDetails,overview:e.target.value})}} name="" placeholder='overview' className='form-control  my-3' id=""></textarea>
            </div>
        </div>
    </div>
 </div>


        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
       <ToastContainer position='top-center' autoClose={2000} theme="colored" />
   
   </>
  )
}

export default Addproject