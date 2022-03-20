import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader} from 'reactstrap'
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
        name: null,
        doB: null,
        salaryScale: null,
        startDate: null,
        department: null,
        annualLeave: null,
        overTime: null,
        salary: null,
        image: null
    }

    this.searchStaff = this.searchStaff.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(event) {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
    event.preventDefault()
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
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Tên</Label>
              <Input type='text' id='username' name='username' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='overtime'>Số ngày đã làm thêm</Label>
              <Input type='text' id='overtime' name='overtime' />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
    )
  }
}

export default Staff;