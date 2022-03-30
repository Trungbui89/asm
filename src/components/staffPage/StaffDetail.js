import React from "react";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  const StaffDetail = (props) => {
    const staff = props.staff
    const department = props.department

    return(   
        <div className="container">
            <div className='row breadcrumb-container'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/staff'>Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="modal-container row">
                <div className="img col-12 col-md-4 col-lg-3">
                    <img src={staff.image} alt={staff.name} />
                </div>
                <div className="info col-12 col-md-8 col-lg-9">
                    <h3>Họ tên: {staff.name}</h3>
                    <p>Ngày Sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                    <p>Ngày Vào Công Ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                    <p>Phòng Ban: {department.name}</p>
                    <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                    <p>Số ngày đã làm thêm: {staff.overTime}</p>
                </div>
            </div>
        </div>
    )
  }

  export default StaffDetail;