import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, requestApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/ContextShare'

function Auth({register}) {
  const {setLoginResponse}=useContext(loginResponseContext)
  const navigate =useNavigate()
const[userDetails,setUserDetails]=useState({
  username:"",
  email:"",
  password:"",
})
console.log(userDetails)
const handleRegister = async()=>{
  const {username,email,password}=userDetails
  if(!username || !email || !password){
   toast.info('fill the form')
  }
  else{
    const result = await requestApi(userDetails)
    console.log(result);
    if(result.status==200){
      toast.success('Registration successfull')
      setUserDetails({
        username:"",
        email:"",
        password:"",

      })
      navigate("/login")
    }
    else if(result.status==406){
      toast.warning(result.response.data)
    }
    else{
      toast.error('something went wrong')
    }
    
  }
}
const handleLogin =async()=>{
  const {email,password}=userDetails
  if(!email || !password){
    toast.info("fill the form completely")
  }
  else{
    const result =await loginApi({email,password})
    console.log(result);
    if(result.status ==200){
      toast.success("login successful")
      setLoginResponse(true)
sessionStorage.setItem("existingUsers",JSON.stringify(result.data.existingUsers))
sessionStorage.setItem("token",result.data.token)

      setUserDetails({
        username:"",
        email:"",
        password:"",

      })
      setTimeout(()=>{
        navigate("/")

      },2000)
      
    }
    else if(result.status==406){
      toast.warning(result.response.data)
    }
    else{
      toast.error('something went wrong')
    }
    
    
  }

}
  return (
   <>
   <div className="container-fluid bg-white py-5">
    <div className="row py-5">
      <div className="col-md-2"></div>
      <div className="col-md-8">
  <Link className='text-decoration-none' to={'/'}>      <h5 className='text-warning mt-4'><FontAwesomeIcon icon={faArrowLeft} /> Back Home</h5></Link>
        <div className='bg-success p-3'>
          <div className="row">
            <div className="col-md-6  p-5">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" width='100%' alt="" />
            </div>
            <div className="col-md-6 py-5 px-4 ">
                 <div>
                 <h2 className='fa-2x text-center text-white mt-5'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h2>
                  {!register?<h5 className='text-center mb-5'>Sign in to Your Account</h5>:
                  <h5 className='text-center mb-5'>Sign up to Your Account</h5>}
                  {register && <div>
                    <input type="text" placeholder='Username' className='form-control rounded-0 p-3 my-3' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
                  </div>}
                  <div>
                  <input type="text" placeholder='Email id' className='form-control rounded-0 p-3 my-3' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
                  </div>
                  <input type="password" placeholder='Password' className='form-control rounded-0 p-3 my-3'  onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />
                 {!register? <div>
                  <button onClick={handleLogin} className='btn btn-warning text-white w-100 p-2 mb-3' style={{fontSize:'20px'}}>Login</button>
                  <p className='text-white'>New User? click Here to <Link to={"/register"} className='text-danger '>Register</Link></p>
                  </div>
                  :
                  <div>
<button className='btn btn-warning text-white w-100 p-2 mb-3' onClick={handleRegister} style={{fontSize:'20px'}}>Register</button>
                  <p className='text-white'>Already a User? click Here to <Link to={"/login"} className='text-danger '>login</Link></p>
                  </div>}
                 </div>
            </div>
          </div>

        </div>
      </div>
      <div className="col-2"></div>
    </div>
   </div>
   <ToastContainer position='top-center' autoClose={2000} theme="colored" />
   </>
  )
}

export default Auth