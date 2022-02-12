import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Staff(props)  {

  const [staffList, setStaffList] = useState(
    props.staffs.map((staff) => {
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
  )
  
  useEffect(() => {
    const button = document.querySelector('.search-container > span')

    button.addEventListener('click', () => {
      const input = document.querySelector('.search-container > input')
      const staffFilted = props.staffs.filter((staffs) => {
        return staffs.name == input.value
      })
      setStaffList (
        staffFilted.map((staff) => {
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
      )
    })
  })

  return (
    <div className='staff-list container'>
      <div className='row breadcrumb-container'>
        <Breadcrumb>
          <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='row'>
          <div className='col-6'>
            <h3>Nhân Viên</h3>
          </div>
          <div className='col-6 search-container'>
            <input />
            <span className="fa fa-search fa-lg"></span> 
          </div>
      </div>
      <hr />
      <div className="row">
          {staffList}
      </div>
    </div>
  )
}

export default Staff;