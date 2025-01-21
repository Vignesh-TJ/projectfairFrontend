import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { homeProjectApi } from '../service/allApi'

function Home() {
  const [homeProject,setHomeProject]=useState([])
  const [isLogin,setIsLogin]=useState(false)
//get homeproject function
const getHomeProject =async()=>{
  const result=await homeProjectApi()
  console.log(result);
  setHomeProject(result.data)
}
console.log(homeProject)



  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  })
  return (
    <>
    
   <div className='bg-white'>
   <div style={{height:'100vh'}} className="container-fluid \ bg-warning p-5  ">
            <div className="row  d-flex justify-content-center align-items-center"><div className="col-md-6 mt-5">
                <h1>Project Fair</h1>
                <p style={{fontSize:'25px',color:'black'}}>One stop destination for all software development projects</p>
{isLogin == false?
  <Link to={'/login'}>                <button className='bg-transparent border-0'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button>
</Link>:               
<Link to={'/dashboard'}>                <button className='bg-transparent border-0'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button>
</Link>}
            </div>
            <div className="col-md-6 ">
                <img className='mt-5' src="https://th.bing.com/th/id/R.bb81017ace8cbaed9fcbb88cf2280cba?rik=ynMEw4fmarRg6A&riu=http%3a%2f%2fwww.designlab.net.au%2fwp-content%2fuploads%2fproject-manager-roll.jpg&ehk=z2LJ5lHVsEqDlj%2bhovdvyWlj8QRIqvGLVZ0%2btxmjEOU%3d&risl=&pid=ImgRaw&r=0" width="100%" alt="" />
                </div>
            </div>
        </div>
        <div>
          <h2 className='text-center text-black mt-5'>Explore Our Projects</h2>
          <div className="container-fluid p-5">
          
             <div className="row">
             {homeProject?.map((item)=>(
             <div className="col-md-4"><ProductCard project={item}/></div>
            ))}
        
           </div>
           
          </div>
       <Link to={'/projects'} className='text-danger'>   <p className='text-center text-warning'>See more Projects...</p></Link>
        </div>
   </div>
  
    </>
  )
}
export default Home