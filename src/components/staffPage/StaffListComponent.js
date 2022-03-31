import React, { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody, CardTitle, Button, Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form'
import { FadeTransform } from 'react-animation-components'
import { Loading } from '../LoadingComponent'
import AddStaffModal from './AddStaffComponent'

// Render staff card

function RenderCard({staff, isLoading, errMess}) {

  if (isLoading) {
    return(
            <Loading />
    );
  }
  else if (errMess) {
      return(
              <h4>{errMess}</h4>
      );
  }
  else 
  return (
    <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
          <Card>
            <Link to={`/staff/${staff.id}`}>
              <CardImg src={staff.image} alt={staff.name} />
              <CardBody>
                <CardTitle>{staff.name}</CardTitle>
              </CardBody>
            </Link>
          </Card>
    </FadeTransform>
  )
}

// search staff

  const searchStaff = (value, setStaffsState, props) => {

    const staffsFilter = props.staffs.map((staff) => {
      if(staff.name.toLowerCase().search(value.username.toLowerCase()) > -1) {
        return (staff)
      }
    })
    setStaffsState(staffsFilter)
  }

// Main

const Staffs = (props) => {

  const [modalState, setModalState] = useState(false)
  const [staffsState, setStaffsState] = useState(props.staffs)

  const toggleModal = () => {
    setModalState(!modalState)
  }

  const staffs = staffsState.map((staff) => {
    if(staff !== undefined){
      return (
          <RenderCard className="col-12 col-md-5 m-1" key={staff.id} staff={staff} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
      )
    }
  });

  if (props.staffsLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
  }
  else if (props.staffsErrMess) {
      return(
          <div className="container">
              <div className="row"> 
                  <div className="col-12">
                      <h4>{props.staffs.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  else
  return (
    <React.Fragment>
      <div className='staff-list container'>
        <div className='row breadcrumb-container'>
          <Breadcrumb>
            <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className='row'>
            <div className='col-6 tittle-container'>
              <h3>Nhân Viên</h3>
              <div className='addBtn' onClick={toggleModal}>
                <i className="fa fa-plus"></i>
              </div>
            </div>
            <LocalForm className='col-6 search-container' onSubmit={(values) => searchStaff(values, setStaffsState, props)}>
              <Control.text model='.username' className='form-control' id='username' name='username' />
              <Button type='submit' value='submit' className="fa fa-search fa-lg"></Button> 
            </LocalForm>
        </div>
        <hr />
        <div className="row staffListRender">
          {staffs}
        </div>
      </div>
      <Modal isOpen={modalState} toggle={toggleModal}>
        <AddStaffModal 
            staffs={props.staffs} 
            departments={props.departments} 
            clickFunction={toggleModal} 
            postStaff={props.postStaff}
            resetFeedbackForm={props.resetFeedbackForm}
        />
      </Modal>
    </React.Fragment>
    )
  
}

export default Staffs;