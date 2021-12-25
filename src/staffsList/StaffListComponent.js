import React, { useState, useEffect } from 'react';
import dateFormat from "dateformat";

function Staff(props)  {

  const [staffList, setStaffList] = useState(null)
  let settingSwitch = false

  useEffect(() => {
    const modal = document.querySelector('.modal')
    if(staffList!= null) {
      modal.classList.add('active')
    }
  },[staffList])

  useEffect(() => {
    const modal = document.querySelector('.modal')
    const handleEvent = () => {
      modal.classList.add('fadeOut')
      setTimeout(() => {
        modal.classList.remove('fadeOut')
        modal.classList.remove('active')
        setStaffList(null)
      }, 200)
    }
    modal.addEventListener('click', handleEvent)   
  },[])

  useEffect(() => {
    const settingBtn = document.querySelector('.setting i')
    function handleEvent() {
      if(!settingSwitch) {
        settingBtn.classList.add('active') 
        settingSwitch= true
      } else {
        settingBtn.classList.remove('active')
        settingSwitch= false
      }
    }
    settingBtn.addEventListener('click', handleEvent)   
  },[])

  useEffect(() => {
    const colBtn = document.querySelectorAll('.setting-option [type=radio]')
    const row = document.querySelectorAll('.row > div')

    function handleEvent(ele) {
      switch(ele.id) {
        case 'col2':
          row.forEach((rowEle) => {rowEle.className = 'col-12 col-md-5 col-lg-5'})
          break;
        case 'col3':
          row.forEach((rowEle) => {rowEle.className = 'col-12 col-md-5 col-lg-4'})
          break;
        case 'col6':
          row.forEach((rowEle) => {rowEle.className = 'col-12 col-md-5 col-lg-2'})
          break;
      }
    }
    colBtn.forEach((ele) => {
      ele.addEventListener('click', () => handleEvent(ele))
    })
  },[])

  const onStaffSelect = (staffSelected) => {
    setStaffList(staffSelected);
  };

  const staffLists = props.staffs.map((staff) => {
    return (
      <div className="col-12 col-md-5 col-lg-4" key={staff.id}>
        <div 
          className='card' 
          onClick={() => onStaffSelect(staff)}
        >
          <div className="img">
            <img src={staff.image} alt={staff.name} />
          </div>
          <div className="staffName">
              <p>{staff.name}</p>
          </div>
        </div>
      </div>
    );
  })

  const renderStaffSelect = (staffSelected) => {

    if (staffSelected != null) {
      return(   
        <div className="modal-container">
          <div className="img">
            <img src={staffSelected.image} alt={staffSelected.name} />
          </div>
          <div className="info">
            <p>{staffSelected.name}</p>
            <p>{staffSelected.department.name}</p>

            <div className="info-date">
              <div className="birthday">
                <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                <p>Ngày Sinh: {dateFormat(staffSelected.doB, "dd/mm/yyyy")}</p>
              </div>
              <div className="startDay">
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
                <p>Ngày Vào Công Ty: {dateFormat(staffSelected.startDate, "dd/mm/yyyy")}</p>
              </div>
            </div>

            <div className="info-other">
              <p>Số ngày nghỉ còn lại: {staffSelected.annualLeave}</p>
              <p>Số ngày đã làm thêm: {staffSelected.overTime}</p>
              <p>Hệ số lương: {staffSelected.salaryScale}</p>
            </div>
          </div>
        </div>
      )
    }
    else
      return(
          <div></div>
      );
  }

  return (
    <div className="container">
      <div className="setting">
        <i className="fa fa-sliders" aria-hidden="true"></i>
        <div className="setting-option">
          <p>Click Để Đổi Số Cột</p>
          <div className="radios">
            <div>
              <label htmlFor="col2">2</label>
              <input type="radio" name='colSetting' id='col2'/>
            </div>
            <div>
              <label htmlFor="col3">3</label>
              <input type="radio" name='colSetting' id='col3'/>
            </div>
            <div>
              <label htmlFor="col6">6</label>
              <input type="radio" name='colSetting' id='col6'/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
          {staffLists}
      </div>
      <div className="modal">
        {renderStaffSelect(staffList)}
      </div>
    </div>
  )
}

export default Staff;