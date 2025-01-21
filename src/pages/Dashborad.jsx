import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profilem from '../components/Profilem'

function Dashborad() {
  return (
  <>
  <Header/>
  <div className="p-5 mt-5 bg-white">
    <h3 className='text-black'>Welcome <span className='text-warning'>user</span></h3>
    <Container>
      <Row className='my-5'>
        <Col sm={12} md={8}>
        <Myprojects/>
        </Col>
        <Col sm={12} md={4}>
        <Profilem/></Col>
      </Row>
    </Container>
  </div>
  </>
  )
}

export default Dashborad