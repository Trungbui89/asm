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

  const [infos] = useState(STAFFS);
  const [department] = useState(DEPARTMENTS);

  const StaffId = ({match}) => {
    console.log(match)
    return (
      <StaffDetail staff={infos.filter((info) => info.id === parseInt(match.params.staffId,10))[0]} />
    )
  }

  return (
    <div className="Main">
      <Header />
        <Switch>
          <Route exact path='/staff' component={() => <Staff staffs={infos} departments={department}/>} />
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