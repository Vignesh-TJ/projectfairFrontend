import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../service/serviceUrl';
import { toast } from 'react-toastify';
import { updateUserProjectApi } from '../service/allApi';
// import { editProjectResponse} from '../context/ContextShare';

function Edit({project}) {
       const [updateStatus,setUpdateStatus]=useState('')
        const [show, setShow] = useState(false);
        const [preview,setPreview]=useState("")
        const [key,setKey]=useState(0)
        console.log(project);
       const [projectDetails,setProjectDetails]=useState({
         title:project.title,
         language:project.language,
         github:project.github,
         website:project.website,
         overview:project.overview,
         projectImage:""
       })

       console.log(projectDetails);
       
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        // const fileS =(e)=>{
        //   console.log(e.target.files)
        // }

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
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectImage:""

          })
          setPreview('')
          if(key==0){
            setKey(1)
          }
          else{
            setKey(0)
          }
        }
        const handleUpdate =async()=>{
          const {title,language,github,website,overview,projectImage}=projectDetails
          if(!title || !language || !github || !website || !overview || !overview ){
            toast.info('fill the form completely')
          }
          else{
            // api
            const reqBody =new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
           preview? reqBody.append("projectImage",projectImage) :reqBody.append("projectImage",project.projectImage)

   const token =sessionStorage.getItem("token")

     if(preview){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await updateUserProjectApi(project._id,reqBody,reqHeader)
      console.log(result)
      if(result.status==200){
        // setEditResponse(result)
        setUpdateStatus(result)
        toast.success('project updates successfully')
        setTimeout(()=>{
          handleClose()
         
      },[3000])
      }
      else{
        handleCancel()
        toast.error('something went wrong')
      }

     }
     else{
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await updateUserProjectApi(project._id,reqBody,reqHeader)
      console.log(result)
      if(result.status==200){
        // setEditResponse(result)
        setUpdateStatus(result)

        toast.success('project updates successfully')
        setTimeout(()=>{
          handleClose()
         
      },[3000])
      }
      else{
        handleCancel()
        toast.error('something went wrong')
      }

     }




          }
        }
       
  return (
    <>
    <FontAwesomeIcon className='text-info me-4 fa-xl' onClick={handleShow} icon={faPenToSquare} />
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
               <img src={preview?preview:`${serverUrl}/upload/${project.projectImage}`}   className='w-100' alt="" />
                <input id='name' key={key} className='d-none'type="file" onChange={(e)=>handlefile(e)}/>
          
               </label>
               
        </div>
        <div className="col-md-6">
            <div>
                <input type="text" onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} value={[projectDetails.title]} placeholder='Title' className='form-control p-2 my-3' />
            </div>
            <div>   <input type="text" onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} value={[projectDetails.language]} placeholder='Language' className='form-control p-2  my-3 ' /></div>
            <div>    <input type="text" onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} value={[projectDetails.github]} placeholder='Github' className='form-control p-2  my-3' /></div>
            <div>    <input type="text" onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} value={[projectDetails.website]} placeholder='Website' className='form-control p-2  my-3' /></div>
            <div>
                <textarea onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} row={5} value={[projectDetails.overview]} name="" placeholder='overview' className='form-control  my-3' id=""></textarea>
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
          <Button variant="success" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit