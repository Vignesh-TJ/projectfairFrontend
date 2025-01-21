import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
   <>
  
    <div className="row bg-success p-5">
        <div className="col-md-3 ">
            <h3><FontAwesomeIcon icon={faStackOverflow} />Project Fair</h3>
            <p className='text-justify mt-3  text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit at doloribus expedita praesentium, debitis cupiditate non qui id est unde nesciunt illum aperiam facilis ad dicta voluptate modi recusandae quos.</p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2 ">
           <h3 >Guides</h3>
           <a href="" className='text-black text-decoration-none '><p>Home</p></a>
           <a href=""  className='text-black text-decoration-none '><p>Projects</p></a>
           <a href=""  className='text-black text-decoration-none '><p>Dashboard</p></a>

        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2">
        <h3 >Links</h3>
           <a href=""  className='text-black text-decoration-none mt-3  '><p>React</p></a>
           <a href=""  className='text-black text-decoration-none '><p>React Bootstrap</p></a>
           <a href=""  className='text-black text-decoration-none '><p>BootsWatch</p></a>
        </div>
        <div className="col-md-3">
            <h3 >Contact Us</h3>
        <div className='d-flex'>
        <input type="text" placeholder='email id' className='form-control  p-3  rounded-0' />
        <button className='btn btn-warning rounded-0 ms-3'>subscribe</button>
        </div>
            <div className='mt-4'>
            <FontAwesomeIcon icon={faInstagram} className='fa-2x text-white  ms-4' />
            <FontAwesomeIcon icon={faTwitter} className='fa-2x text-white ms-5' />
            <FontAwesomeIcon icon={faFacebook} className='fa-2x text-white ms-5' />
            <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-white ms-5' />
            </div>
        </div>
    </div>
   
   
   </>
  )
}

export default Footer