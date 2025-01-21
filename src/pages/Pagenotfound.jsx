import React from 'react'

function Pagenotfound() {
  return (
   <>
   <div className="container-fluid  bg-white p-5">
    <div className="row bg-white">
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img className='w-75' src="https://consultation.co.jp/img/404-page-animation-example.gif" alt="" />
            <h1 className='text-black'>Look Like You Are Lost</h1>
            <h5 className='text-black'>page you are looking is unavailable</h5>
            <button className='btn btn-success px-4 py-3   mt-3 rounded-0'>GO HOME</button>
        </div>
        <div className="col-md-2"></div>
    </div>
   </div>
   </>
  )
}

export default Pagenotfound