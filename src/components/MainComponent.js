import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staffs from './staffPage/StaffListComponent';
import StaffDetail from './staffPage/StaffDetail';
import Department from './departmentPage/DepartmentComponent';
import DepartmentDetail from './departmentPage/DepartmentDetail';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';
import { fetchStaffs, fetchDepartments, postStaff, patchStaff, deleteStaff, fetchRenderSalary } from '../store/actions/ActionCreators';

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries
  }  
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchRenderSalary: () => {dispatch(fetchRenderSalary())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  resetUpdateFeedbackForm: () => { dispatch(actions.reset('updateFeedBack'))},
  postStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) =>
    dispatch(postStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)),
  patchStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) =>
    dispatch(patchStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)),
  deleteStaff: (id)=> dispatch(deleteStaff(id))
})

// main class

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs()
    this.props.fetchDepartments()
    this.props.fetchRenderSalary()
  }

  // render

  render() {
    const StaffId = ({match}) => {
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} 
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          departmentLoading={this.props.departments.isLoading}
          departmentErrMess={this.props.departments.errMess}
          resetUpdateFeedbackForm={this.props.resetUpdateFeedbackForm}
          patchStaff={this.props.patchStaff}
          deleteStaff={this.props.deleteStaff}
        >
        </StaffDetail>
      )
    }

    const departmentId = ({match}) => {
        return (
          <DepartmentDetail
            department={this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0]}
            departmentLoading={this.props.departments.isLoading}
            departmentErrMess={this.props.departments.errMess}
            staffs={this.props.staffs.staffs}
            staffsLoading={this.props.staffs.isLoading}
            staffsErrMess={this.props.staffs.errMess}
          />
        )
    }

    const Salaries = () => {
      return (
        <Salary 
          staffs={this.props.salaries.salaries}
          salariesLoading={this.props.salaries.isLoading}
          salariesErrMess={this.props.salaries.errMess}
        />
      )
    }
          
    const HomeStaffs = () => {
      return(
        <Staffs 
          staffs={this.props.staffs.staffs} 
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          postStaff={this.props.postStaff}
          resetFeedbackForm={this.props.resetFeedbackForm}
        />
      )
    }

    return (
      <div className="Main">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
            <Switch>
              <Route exact path='/staff' component={HomeStaffs}/>
              <Route path='/staff/:staffId' component={StaffId} />
              <Route exact path='/department' component={() => <Department 
                departments={this.props.departments.departments}
              /> }/>
              <Route path='/departments/:departmentId' component={departmentId} />
              <Route exact path='/salary' component={Salaries} />
              <Redirect to='/staff' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));