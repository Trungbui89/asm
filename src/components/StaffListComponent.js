import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Label, Input, Modal, ModalBody, ModalHeader} from 'reactstrap'
import { Link } from 'react-router-dom';

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
        name: '',
        birthday: '',
        salaryScale: '',
        startDate: '',
        departmentSelected: '',
        annualLeave: '',
        overTime: '',
        salary: '',
        image: '',
        touched: {
          name: false,
          departmentSelected: false,
          birthday: false,
          salaryScale: false,
          startDate: false,
          annualLeave: false,
          overTime: false
        }
    }

    this.searchStaff = this.searchStaff.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    })
  }

  validate(name, departmentSelected, salaryScale, annualLeave, overTime, birthday, startDate) {
    const error = {
      name: '',
      departmentSelected: '',
      salaryScale: '',
      annualLeave: '',
      overTime: '',
      birthday: '',
      startDate: ''
    }

    if(this.state.touched.name && name.length < 3) {
      error.name = 'Tên phải dài hơn 3 ký tự'
    } else if (this.state.touched.name && name.length > 30){
      error.name = 'Tên phải ít hơn 30 ký tự'
    }

    if(this.state.touched.birthday && birthday === '') {
      error.birthday = 'Hãy chọn ngày sinh'
    }

    if(this.state.touched.startDate && startDate === '') {
      error.startDate = 'Hãy chọn ngày vào Cty'
    }

    if(this.state.touched.departmentSelected && departmentSelected === '-1') {
      error.departmentSelected = 'Hãy chọn phòng ban'
    }

    if(this.state.touched.salaryScale && isNaN(Number(salaryScale))) {
      error.salaryScale = 'nhập giá trị số 1.0 -> 3.0'
    } else if(this.state.touched.salaryScale && isNaN(Number(salaryScale)) && Number(salaryScale)<1 && Number(salaryScale)>3) {
      error.salaryScale = 'nhập giá trị số 1.0 -> 3.0'
    }

    if(this.state.touched.annualLeave && isNaN(Number(annualLeave))) {
      error.annualLeave = 'Hãy nhập giá trị số'
    }

    if(this.state.touched.overTime && isNaN(Number(overTime))) {
      error.overTime = 'Hãy nhập giá trị số'
    }

    return error
  }

  handleChange(event) {
    const target = event.target
    const value =  target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    this.toggleModal()
    event.preventDefault()
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  
  searchStaff(event) {
    const staffFilted = this.props.staffs.filter((staff) => {
      return (
        staff.name.toLowerCase().search(this.username.value.toLowerCase()) > -1
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
    event.preventDefault()
  }

  render() {

    const staffList = this.state.staffList
    const error = this.validate(this.state.name, this.state.birthday, this.state.startDate, this.state.departmentSelected, this.state.salaryScale, this.state.annualLeave, this.state.overTime)

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
            <Form className='col-6 search-container' onSubmit={this.searchStaff}>
              <Input type='text' id='username' name='username' innerRef={(input) => this.username = input} />
              <Button type='submit' value='submit' className="fa fa-search fa-lg"></Button> 
            </Form>
        </div>
        <hr />
        <div className="row staffListRender">
            {staffList}
        </div>
      </div>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader>
          <h3>Thêm Nhân Viên</h3>
          <i className="fa fa-times" onClick={this.toggleModal}></i>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='name'>Tên</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='text' id='name' name='name' 
                value={this.state.name}
                onChange={this.handleChange}
                onBlur={this.handleBlur('name')}
                valid={error.name === ''}
                invalid={error.name !== ''}
                />
                <FormFeedback>{error.name}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='birthday'>Ngày sinh</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='date' id='birthday' name='birthday' 
                value={this.state.birthday}
                onChange={this.handleChange}
                onBlur={this.handleBlur('birthday')}
                valid={error.birthday === ''}
                invalid={error.birthday !== ''}
                />
                <FormFeedback>{error.birthday}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='startDate'>Ngày vào công ty</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='date' id='startDate' name='startDate' 
                value={this.state.startDate}
                onChange={this.handleChange}
                onBlur ={this.handleBlur('startDate')}
                valid={error.startDate === ''}
                invalid={error.startDate !== ''}
                />
                <FormFeedback>{error.startDate}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='department'>Phòng ban</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <select class="form-select form-select-lg" name='departmentSelected' 
                onChange={this.handleChange} 
                onBlur ={this.handleBlur('departmentSelected')}
                valid={error.departmentSelected === ''}
                invalid={error.departmentSelected !== ''}
                >
                  <option value="-1" selected>chọn phòng ban</option>
                  {this.state.department.map(department => {
                    return (
                      <option value={department}>{department}</option>
                    )
                  })}
                </select>
                <FormFeedback>{error.departmentSelected}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='salaryScale'>Hệ số lương</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='text' id='salaryScale' name='salaryScale' 
                value={this.state.salaryScale}
                onChange={this.handleChange}
                onBlur ={this.handleBlur('salaryScale')}
                valid={error.salaryScale === ''}
                invalid={error.salaryScale !== ''}
                />
                <FormFeedback>{error.salaryScale}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='annualLeave'>Số ngày nghỉ còn lại</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='text' id='annualLeave' name='annualLeave' 
                value={this.state.annualLeave}
                onChange={this.handleChange}
                onBlur ={this.handleBlur('annualLeave')}
                valid={error.annualLeave === ''}
                invalid={error.annualLeave !== ''}
                />
                <FormFeedback>{error.annualLeave}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row'>
              <div className='col-12 col-md-4 col-lg-4'>
                <Label htmlFor='overTime'>Số ngày đã làm thêm</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Input type='text' id='overTime' name='overTime' 
                value={this.state.overTime}
                onChange={this.handleChange}
                onBlur ={this.handleBlur('overTime')}
                valid={error.overTime === ''}
                invalid={error.overTime !== ''}
                />
                <FormFeedback>{error.overTime}</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup className='row justify-content-md-center'>
              <div className='col-3'>
                <Button type='submit' value='submit' color='primary'>Thêm</Button>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
    )
  }
}

export default Staff;