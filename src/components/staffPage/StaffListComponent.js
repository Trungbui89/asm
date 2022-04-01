import React, { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle, Button, Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form'
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
    <div className='col-12 col-md-6 col-lg-4'>
      <Card>
        <Link to={`/staff/${staff.id}`}>
          <div className='cards-img-background' />
          <div className='cards-img-border' />
          <div className='cards-img'>
            <img className="img-fluid" src={staff.image} alt={staff.name} />
          </div>
          <CardBody>
            <CardTitle>{staff.name}</CardTitle>
          </CardBody>
        </Link>
      </Card>
    </div>
  )
}

// search staff

  const searchStaff = (value, setStaffsState, props) => {
      const staffsFilter = props.staffs.map((staff) => {
        if(staff.name !== undefined && value.username !== undefined) {
          if(staff.name.toLowerCase().search(value.username.toLowerCase()) > -1) {
            return (staff)
          }
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
          <RenderCard key={staff.id} staff={staff} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
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
      <div className='container'>
        <div className='staff-list'>
          <div className='addBtn-container' onClick={toggleModal}>
            <div className='addBtn-info'>
              <p>THÊM NHÂN VIÊN</p>
            </div>
            <div className='addBtn' >
              <i className="fa fa-plus"></i>
            </div>
          </div>
          <div className='row breadcrumb-container'>
            <Breadcrumb>
              <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className='row search-container'>
              <LocalForm className='col-6' onSubmit={(values) => searchStaff(values, setStaffsState, props)}>
                <Control.text model='.username' className='form-control' id='username' name='username' placeholder='Nhập tên nhân viên cần tìm kiếm'/>
                <Button type='submit' value='submit' className="fa fa-search fa-lg"></Button> 
              </LocalForm>
          </div>
          <div className="row staffListRender">
            {staffs}
          </div>
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