import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumb, BreadcrumbItem, Button, Form, Input, Modal, ModalBody, ModalHeader} from 'reactstrap'
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
          );
        })
    }

    this.searchStaff = this.searchStaff.bind(this)
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
    <div className='staff-list container'>
      <div className='row breadcrumb-container'>
        <Breadcrumb>
          <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='row'>
          <div className='col-6 tittle-container'>
            <h3>Nhân Viên</h3>
            <div className='addBtn'>
              <i class="fa fa-plus"></i>
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
    )
  }
}

export default Staff;