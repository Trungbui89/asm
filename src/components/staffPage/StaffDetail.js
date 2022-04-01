import React, { useState } from "react";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem, Modal,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import EditStaffModal from './EditStaffComponent'
import { Loading } from "../LoadingComponent";

const StaffDetail = (props) => {

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
        const staff = props.staff
        const staffDepartment = props.departments.filter(ele => {
            return ele.id === staff.departmentId
        })[0].name
        const departments = props.departments
        const [modalState, setModalState] = useState(false)
    
        const toggleModal = () => {
            setModalState(!modalState)
        }
    
        const delStaff = () => {
            props.deleteStaff(staff.id)
        }

        return(
            <React.Fragment>
                <div className="container staff-detail">
                    <div className='row breadcrumb-container'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/staff'>Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="modal-container row">
                        <div className="img col-12 col-md-4 col-lg-3">
                            <div className='img-container'>
                                <img src={staff.image} alt={staff.name} />
                            </div>
                            <div className='bg-img'>
                                <img src={staff.image} alt={staff.name} />
                            </div>
                        </div>
                        <div className="info col-12 col-md-6 col-lg-7">
                            <h3>Họ tên: {staff.name}</h3>
                            <p>Ngày Sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                            <p>Ngày Vào Công Ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                            <p>Phòng Ban: {staffDepartment}</p>
                            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                            <p>Số ngày đã làm thêm: {staff.overTime}</p>
                        </div>
                        <div className="edit col-12 col-md-2 col-lg-2">
                            <div className="edit-staff-icon" onClick={toggleModal}>
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </div>
                            <Link to={`/staff`} className='del-staff-link' onClick={delStaff}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modalState} toggle={toggleModal}>
                    <EditStaffModal 
                        staff={staff}
                        departments={departments} 
                        clickFunction={toggleModal} 
                        patchStaff={props.patchStaff}
                        resetUpdateFeedbackForm={props.resetUpdateFeedbackForm}
                    />
                </Modal>
            </React.Fragment>   
        )
    }
}

  export default StaffDetail;