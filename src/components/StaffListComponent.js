import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length
const minLength = (len) => (val) => {return val && val.length >= len}
const isNumber = (val) => !isNaN(Number(val))
const salaryScaleRequired = (minLen, maxLen) => (val) => !isNaN(Number(val)) && (Number(val) >= minLen) && (Number(val) <= maxLen)

class Staff extends Component {

  constructor(props) {
    super(props)

    this.state = {
      staffList: this.props.staffs.map((staff) => {
        return (
          <div className="col-6 col-md-4 col-lg-2">
            <Link to={`/staff/${staff.id}`} >
              <div className='staff-card'>
                  <div className="img">
                    <img src={staff.image} alt={staff.name} />
                  </div>
                  <div className="staffName">
                      <p>{staff.name}</p>
                  </div>
              </div>
            </Link>
          </div>
        )
      }),
      isModalOpen: false,
      department: this.props.departments.map((department) => {
        return (
          department.name
        )
      }),
    }

    this.searchStaff = this.searchStaff.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (value) => {
    console.log(value)
    this.toggleModal()

    if (window.localStorage.getItem('staffID')) {
     window.localStorage.setItem('staffID', Number(window.localStorage.getItem('staffID')) + 1)     
    } else {
      window.localStorage.setItem('staffID', this.props.staffs[this.props.staffs.length - 1].id + 1)
    }

    // window.localStorage.removeItem('staffID')
    // window.localStorage.removeItem('newStaffs')

    let departmentSeted = this.props.departments.filter((dept) => {
      if(value.departmentSelected === dept.name){
        return dept
      }
    })[0]
    if(departmentSeted == undefined) {
      departmentSeted = {name: 'Chưa có phòng ban'}
    }

    const newStaff = {
      id: Number(window.localStorage.getItem('staffID')),
      name: value.name,
      doB: value.birthday,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      department: departmentSeted,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      salary: 5000000,
      image: '/assets/images/alberto.png'
    }

    if (window.localStorage.getItem('newStaffs')) {
      window.localStorage.setItem('newStaffs', window.localStorage.getItem('newStaffs').concat(';', JSON.stringify(newStaff)))
    } else {
      window.localStorage.setItem('newStaffs', JSON.stringify(newStaff))
    }

    const addNewStaff = window.localStorage.getItem('newStaffs').split(';').map((staff) => {
      return JSON.parse(staff)
    })

    this.props.mainComptSetState(addNewStaff[addNewStaff.length - 1])
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  
  searchStaff = (value) => {
    const staffFilted = this.props.staffs.filter((staff) => {
      return (
        staff.name.toLowerCase().search(value.username.toLowerCase()) > -1
      )
    })
    this.setState({staffList: staffFilted.map((staff) => {
        return (
          <div className="col-6 col-md-4 col-lg-2">
            <Link to={`/staff/${staff.id}`} >
              <div className='staff-card'>
                  <div className="img">
                    <img src={staff.image} alt={staff.name} />
                  </div>
                  <div className="staffName">
                      <p>{staff.name}</p>
                  </div>
              </div>
            </Link>
          </div>
        )
      })
    }) 
  }

  render() {
    
    const staffList = this.state.staffList
 
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
              <div className='addBtn' onClick={this.toggleModal}>
                <i className="fa fa-plus"></i>
              </div>
            </div>
            <LocalForm className='col-6 search-container' onSubmit={(values) => this.searchStaff(values)}>
              <Control.text model='.username' className='form-control' id='username' name='username' innerRef={(input) => this.username = input} />
              <Button type='submit' value='submit' className="fa fa-search fa-lg"></Button> 
            </LocalForm>
        </div>
        <hr />
        <div className="row staffListRender">
            {staffList}
        </div>
      </div>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader>
          <div>Thêm Nhân Viên</div>
          <i className="fa fa-times" onClick={this.toggleModal}></i>
        </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='name'>Tên</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.text model='.name' id='name' name='name' 
                  className='form-control'
                  validators={{
                    required, minLength: minLength(3)
                  }}
                />
                <Errors
                  className='text-danger error'
                  model='.name'
                  show='touched'
                  messages = {{
                    required: 'Hãy nhập tên',
                    minLength: 'Tên phải dài hơn 3 ký tự'
                  }}
                />
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='birthday'>Ngày sinh</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.input type='date' model='.birthday' id='birthday' name='birthday' 
                className='form-control'
                validators={{
                  required
                }}
              />
              <Errors
                className='text-danger error'
                model='.birthday'
                show='touched'
                messages = {{
                  required: 'Hãy nhập ngày sinh'
                }}
              />
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='startDate'>Ngày vào công ty</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.input type='date' model='.startDate' id='startDate' name='startDate' 
                className='form-control'
                validators={{
                  required
                }}
              />
              <Errors
                className='text-danger error'
                model='.startDate'
                show='touched'
                messages = {{
                  required: 'Hãy nhập ngày vào cty'
                }}
              />
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='departmentSelected'>Phòng ban</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.select 
                  model='.departmentSelected' 
                  className="form-control form-select form-select-lg" 
                  id='departmentSelected' 
                  name='departmentSelected'
                  validators={{
                    required
                  }}
                >
                  <option value='' selected>chọn phòng ban</option>
                  {this.state.department.map(department => {
                    return (
                      <option value={department}>{department}</option>
                    )
                  })}
                </Control.select>
                <Errors
                  className='text-danger error'
                  model='.departmentSelected'
                  show='touched'
                  messages = {{
                    required: 'Hãy chọn phòng ban'
                  }}
                />
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='salaryScale'>Hệ số lương</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.text model='.salaryScale' id='salaryScale' name='salaryScale' 
                  className='form-control'
                  validators={{
                    required, salaryScaleRequired: salaryScaleRequired(1, 3), isNumber
                  }}
                />
                <Errors
                  className='text-danger error'
                  model='.salaryScale'
                  show='touched'
                  messages = {{
                    required: 'Hãy nhập hệ số lương',
                    salaryScaleRequired: 'Hệ số lương từ 1.0 -> 3.0',
                    isNumber: 'Hãy nhập giá trị số'
                  }}
                />                
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='annualLeave'>Số ngày nghỉ còn lại</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.text model='.annualLeave' id='annualLeave' name='annualLeave' 
                  className='form-control'
                  validators={{
                    required, isNumber
                  }}
                />
                <Errors
                  className='text-danger error'
                  model='.annualLeave'
                  show='touched'
                  messages = {{
                    required: 'Hãy nhập số ngày nghỉ còn lại',
                    isNumber: 'Hãy nhập giá trị số'
                  }}
                /> 
              </div>
            </Row>
            <Row className='form-group row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='overTime'>Số ngày đã làm thêm</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.text model='.overTime' id='overTime' name='overTime' 
                  className='form-control'
                  validators={{
                    required, isNumber
                  }}
                />
                <Errors
                  className='text-danger error'
                  model='.overTime'
                  show='touched'
                  messages = {{
                    required: 'Hãy nhập số ngày nghỉ còn lại',
                    isNumber: 'Hãy nhập giá trị số'
                  }}
                /> 
              </div>
            </Row>
            <Row className='form-group row justify-content-md-center'>
              <div className='col-3'>
                <Button type='submit' value='submit' color='primary'>Thêm</Button>
              </div>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
    )
  }
}

export default Staff;