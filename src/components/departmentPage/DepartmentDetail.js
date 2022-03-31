import React from 'react'
import { Breadcrumb, BreadcrumbItem, 
  Card, CardImg, CardBody, CardTitle} from 'reactstrap'
import { FadeTransform } from 'react-animation-components'
import { Loading } from '../LoadingComponent'
import { Link } from 'react-router-dom'


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
              <CardImg src={staff.image} alt={staff.name} />
              <CardBody>
                <CardTitle>{staff.name}</CardTitle>
              </CardBody>
          </Card>
    </FadeTransform>
  )
}

// Main

const DepartmentDetail = (props) => {
    console.log(props)
    if (props.staffsLoading || props.departmentLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.staffsErrMess || props.departmentErrMess) {
      return(
          <div className="container">
              <div className="row"> 
                  <div className="col-12">
                      <h4>{props.staff.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  else {
    const staffs = props.staffs.map((staff) => {
      if(staff.departmentId === props.department.id){
        return (
            <RenderCard className="col-12 col-md-5 m-1" key={staff.id} staff={staff} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
        )
      } else return null
    })
  
    if (props.staffsLoading || props.departmentLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
    }
    else if (props.staffsErrMess || props.departmentErrMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.staffsErrMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
    return (
      <div className='staff-list container'>
        <div className='row breadcrumb-container'>
          <Breadcrumb>
            <BreadcrumbItem><Link to='/department'>Phòng Ban</Link></BreadcrumbItem>
            <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <hr />
        <div className="row staffListRender">
          {staffs}
        </div>
      </div>
    )
  } 
}

export default DepartmentDetail;