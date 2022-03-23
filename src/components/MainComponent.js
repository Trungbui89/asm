import React, { useState } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staff from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DepartmentComponent';
import Salary from './Salary';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

function Main()  {

  let addNewStaffs = []
  if(window.localStorage.getItem('newStaffs')){
    addNewStaffs = window.localStorage.getItem('newStaffs').split(';').map((staff) => {
      return JSON.parse(staff)
    })
  }

  const [infos, setInfos] = useState(STAFFS.concat(addNewStaffs));
  const [department] = useState(DEPARTMENTS);

  const StaffId = ({match}) => {
    return (
      <StaffDetail staff={infos.filter((info) => info.id === parseInt(match.params.staffId,10))[0]} />
    )
  }

  const mainComptSetState = (addNewStaff) => {
    console.log(addNewStaff)
    setInfos(STAFFS.concat(addNewStaff))
  }

  return (
    <div className="Main">
      <Header />
        <Switch>
          <Route exact path='/staff' component={() => <Staff staffs={infos} departments={department} mainComptSetState={mainComptSetState}/>} />
          <Route path='/staff/:staffId' component={StaffId} />
          <Route exact path='/department' component={() => <Department departments={department}/>} />
          <Route exact path='/salary' component={() => <Salary staffs={infos}/>} />
          <Redirect to='/staff' />
        </Switch>
      <Footer />
    </div>
  );
}

export default Main;