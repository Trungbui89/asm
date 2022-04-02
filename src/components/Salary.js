import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from "./LoadingComponent";

function Salary(props) {

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
    else return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className='card'>
          <div className="card-body">
            <div className="header">
              <h1>{staff.name}</h1>
            </div>
            <div className="content">
              <p>Mã Nhân Viên: {staff.id}</p>
              <p>Hệ Số Lương: {staff.salaryScale}</p>
              <p>Số Giờ Làm Thêm: {staff.overTime}</p>
              <div className="salary-bg">Lương: {staff.salary}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const salaryLists = props.staffs.map((staff) => {
        return (
          <RenderCard key={staff.id} staff={staff} isLoading={props.salariesLoading} errMess={props.salariesErrMess} />
        );
      })

    return (
      <div className='container salary'>
        <div className='row breadcrumb-container'>
          <Breadcrumb>
            <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="card-container container">
            <div className="row">
                {salaryLists}
            </div>
        </div>
      </div>
    )
}

export default Salary;