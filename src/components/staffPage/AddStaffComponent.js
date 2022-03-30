import React from 'react'
import { Button, Input, Label, ModalBody, ModalHeader, Row} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length
const minLength = (len) => (val) => {return val && val.length >= len}
const isNumber = (val) => !isNaN(Number(val))
const salaryScaleRequired = (minLen, maxLen) => (val) => !isNaN(Number(val)) && (Number(val) >= minLen) && (Number(val) <= maxLen)

const handleSubmit = (value, props) => {
    // console.log(props)
    props.postStaff(
        props.staffs[props.staffs.length - 1].id, 
        value.name, 
        value.doB, 
        value.salaryScale, 
        value.startDate, 
        value.departmentSelected, 
        value.annualLeave, 
        value.overTime, 
        "/assets/images/alberto.png", 
        5000000
    )
    props.clickFunction()
  }

function AddStaffModal(props) {

    return (
        <React.Fragment>
        <ModalHeader>
          <div>Thêm Nhân Viên</div>
          <i className="fa fa-times" onClick={props.clickFunction}></i>
        </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values, props)}>
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
                <Label htmlFor='doB'>Ngày sinh</Label>
              </div>
              <div className='col-12 col-md-8 col-lg-8'>
                <Control.input type='date' model='.doB' id='doB' name='doB' 
                className='form-control'
                validators={{
                  required
                }}
              />
              <Errors
                className='text-danger error'
                model='.doB'
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
                  <option value="" selected>chọn phòng ban</option>
                  {props.departments.map(department => {
                    return (
                      <option key={department.id} value={department.id}>{department.name}</option>
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
      </React.Fragment>
    )
}

export default AddStaffModal