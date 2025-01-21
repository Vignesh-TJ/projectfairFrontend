import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { allProjectApi } from "../service/allApi"



function Projects() {

  const[token,setToken]=useState("")
  const[allProject,setAllProject]=useState([])
  const [searchKey,setSearchKey]=useState("")

  const getAllProjects=async()=>{
    if(sessionStorage.getItem("token")){
      const token =sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await allProjectApi(searchKey,reqHeader)
      // console.log(result.data);
      setAllProject(result.data)
      
    }
  }
  console.log(searchKey);
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  

  useEffect(()=>{
    getAllProjects()
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem('token'))
    }
  },[])
  return (
    <>
      <Header />
      <h3 className="text-center my-4">All Projects</h3>
     { !token? <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <img src="https://i.pinimg.com/originals/ab/05/94/ab059423d9884639658baf6764ceb970.gif" style={{height:'100%',width:'100%'}} alt="" className="w-75 fluid roundedCircle"/>
            <h4 className="text-center mt-4">Please <Link to={'/login'}>Login</Link> to see more projects</h4>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      :
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex">
            <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder="Technologies" className="form-control shadow" />
            <FontAwesomeIcon style={{ color: 'lightgray', marginTop: '10px', marginLeft: '-30px' }} icon={faMagnifyingGlass} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>}

    
           <div className="container-fluid my-5 p-3">
           <div className="row">
             {allProject?.map((item)=>(
                <div className="col-md-3">
                <ProductCard project={item} />
              </div>
             )) }
           </div>
         </div>
     
    </>
  )
}

export default Projects