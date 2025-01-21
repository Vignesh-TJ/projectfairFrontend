import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { serverUrl } from "../service/serviceUrl"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported
import Collapse from 'react-bootstrap/Collapse';
import { updateUserProfileApi } from "../service/allApi";


function Profilem() {
  const [open, setOpen] = useState(false);

  const[updateStatus,setUpdateStatus]=useState({})
  const[preview,setPreview]=useState("")
  const[exisintgImg,setExistingImg]=useState("")
  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    profile:"",
    linkedin:"",
    github:""
  })
  console.log(userDetails);


const handleFile=(e)=>{
  setUserDetails({...userDetails,profile:e.target.files[0]})
}

const handleUpdate=async()=>{
  const{username,email,password,profile,linkedin,github}= userDetails
  if(!github || !linkedin){
    toast.info("Enter github and linkedin")
  }
  else{
    // api

    const reqBody=new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?     reqBody.append("profile",profile) :  reqBody.append("profile",exisintgImg)

    const token=sessionStorage.getItem("token")

          if(preview){
            const reqHeader={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            const result=await updateUserProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success("profile updated successfully")
              sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
              setUpdateStatus(result)
            }
            else{
              toast.error("something went wrong")
            }
          }
          else{
            const reqHeader={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
            const result=await updateUserProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success("profile updated successfully")
              sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
              setUpdateStatus(result)
            }
            else{
              toast.error("something went wrong")
            }
          }


  }
}

useEffect(()=>{
  if(userDetails.profile){
    setPreview(URL.createObjectURL(userDetails.profile))
  }
},[userDetails.profile])
console.log(preview);


  useEffect(()=>{
    if(sessionStorage.getItem("existingUsers")){
      const user=JSON.parse(sessionStorage.getItem("existingUsers"))
      console.log(user);
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,linkedin:user.linkedin,github:user.github})
      setExistingImg(user.profile)
    }
  },[updateStatus])
  
  return (
    <>
    <div className="p-4 shadow" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className="d-flex justify-content-between">
            <h4 className="text-success">Profile</h4>
            <button className="btn" onClick={() => setOpen(!open)}>
             {open==true? <FontAwesomeIcon icon={faAngleUp} />
             :
              <FontAwesomeIcon icon={faAngleDown} />}
              </button>
        </div>
        <Collapse in={open}>
        <div>
        <div className="d-flex justify-content-center align-items-center flex-column">
        <label htmlFor="profileimg">
                            <input type="file" onChange={(e)=>handleFile(e)} id="profileimg" className='d-none' />
                           {exisintgImg=="" ? <img src={preview? preview :"https://media.istockphoto.com/id/1142192548/vector/man-avatar-profile-male-face-silhouette-or-icon-isolated-on-white-background-vector.jpg?s=612x612&w=0&k=20&c=DUKuRxK9OINHXt3_4m-GxraeoDDlhNuCbA9hp6FotFE="} alt="" style={{width:"200px",height:"200",borderRadius:"50%",marginBottom:"10px"}} />
                              :
                            <img src={preview? preview :` ${serverUrl}/upload/${exisintgImg}`}alt="" style={{width:"200px",height:"200",borderRadius:"50%",marginBottom:"10px"}} />}

                        </label>

            <div className="w-100">
                    <div className="mb-3">
                    <input type="text" value={userDetails?.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} placeholder='Github' className='form-control'/>

                    </div>
                    <div className="mb-3">
                    <input type="text" value={userDetails?.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='LinkedIn' className='form-control'/>
                    </div>
                    <div className="mb-3 text-center">
                        <button className="btn btn-warning p-2 w-75" onClick={handleUpdate}>Update Profile</button>
                    </div>
            </div>
        </div>
        </div>
        </Collapse>
    </div>
    <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  )
}

export default Profilem