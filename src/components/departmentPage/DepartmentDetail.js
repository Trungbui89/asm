import React from 'react'
import { Breadcrumb, BreadcrumbItem, 
  Card, CardBody, CardTitle} from 'reactstrap'
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
    <div className="col-12 col-md-6 col-lg-4">
            <Card>
              <div className='like-archor'>
                  <div className='cards-img-background'/>
                  <div className='cards-img-border'/>
                  <div className='cards-img'>
                    <img className="img-fluid" src={staff.image} alt={staff.name} />
                  </div>
                  <CardBody>
                    <CardTitle>{staff.name}</CardTitle>
                  </CardBody>
              </div>
            </Card>
    </div>
  )
}

// Main

const DepartmentDetail = (props) => {
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
            <RenderCard key={staff.id} staff={staff} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
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
            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
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