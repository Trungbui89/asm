import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Salary(props) {

  
  const salaryLists = props.staffs.map((staff) => {
      const basicSalary = 3000000;
      const overTimeSalary = 200000;
      const salary = (staff.salaryScale * basicSalary) + (staff.overTime * overTimeSalary);
        return (
          <div className="col-12 col-md-6 col-lg-4" key={staff.id}>
            <div className='card'>
              <div className="card-body">
                <div className="header">
                  <h1>{staff.name}</h1>
                </div>
                <div className="content">
                  <p>Mã Nhân Viên: {staff.id}</p>
                  <p>Hệ Số Lương: {staff.salaryScale}</p>
                  <p>Số Giờ Làm Thêm: {staff.overTime}</p>
                  <div className="salary-bg">Lương: {salary}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })

    return (
      <div className='staff-list container'>
        <div className='row breadcrumb-container'>

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