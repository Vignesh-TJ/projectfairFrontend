import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';
function Header() {
  const {setLoginResponse}=useContext(loginResponseContext)
  const [token,setToken]=useState('')
  const navigate =useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])

  const handleLogout=()=>{
    sessionStorage.removeItem('existingUsers')
    sessionStorage.removeItem('token')
    setLoginResponse(false)
   navigate('/')
  }
  return (
   <>
   
   <Navbar className="bg-success d-flex align-items-center" fixed='top'>
        <Container>
          <Navbar.Brand >
<Link to={'/'} className='text-decoration-none'>         <span className='fs-4 text-white'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</span>
</Link>
          </Navbar.Brand>
{token &&           <button onClick={handleLogout} className='btn btn-warning rounded-0 ms-auto'><FontAwesomeIcon className='me-2' icon={faPowerOff} />Logout</button>
}
        </Container>
      </Navbar>
      </>
  )
}

export default Header