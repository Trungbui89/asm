import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

function Department(props) {

  const departmentLists = props.departments.map((department) => {
      return (
        <div className="col-12 col-md-6 col-lg-4 card" key={department.id}>
          <Link to={`/departments/${department.id}`}>
            <div className="card-body">
              <div className="header">
                <h1>{department.name}</h1>
              </div>
              <div className="content">
                <p>Số Lượng Nhân Viên: {department.numberOfStaff}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    })

  return (
    <div className='staff-list container'>
      <div className='row breadcrumb-container'>
        <Breadcrumb>
          <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="card-container container">
          <div className="row">
              {departmentLists}
          </div>
      </div>
    </div>
  )
}

export default Department;