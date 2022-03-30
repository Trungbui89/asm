import React, { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, 
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
  Button, Input, Label, Modal, Row} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
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

// Main

const Staffs = (props) => {

  const [modalState, setModalState] = useState(false)

  const toggleModal = () => {
    setModalState(!modalState)
  }

  const staffs = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-5 m-1">
          <RenderCard staff={staff} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
      </div>
    );
  });

  if (props.staffs.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
  }
  else if (props.staffs.errMess) {
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
            <LocalForm className='col-6 search-container'>
              <Control.text model='.username' className='form-control' id='username' name='username' innerRef={(input) => this.username = input} />
              <Button type='submit' value='submit' className="fa fa-search fa-lg"></Button> 
            </LocalForm>
        </div>
        <hr />
        <div className="row staffListRender">
          {staffs}
        </div>
      </div>
      <Modal isOpen={modalState} toggle={toggleModal}>
        <AddStaffModal staffs={props.staffs} departments={props.departments} clickFunction={toggleModal} postStaff={props.postStaff}/>
      </Modal>

    </React.Fragment>
    )
  
}

export default Staffs;