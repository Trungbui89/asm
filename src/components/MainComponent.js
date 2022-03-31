import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staffs from './staffPage/StaffListComponent';
import StaffDetail from './staffPage/StaffDetail';
import Department from './departmentPage/DepartmentComponent';
import DepartmentDetail from './departmentPage/DepartmentDetail';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';
import { fetchStaffs, fetchDepartments, postStaff, patchStaff, deleteStaff } from '../store/actions/ActionCreators';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }  
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
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
          <Switch location={this.props.location}>
            <Route exact path='/staff' component={HomeStaffs}/>
            <Route path='/staff/:staffId' component={StaffId} />
            <Route exact path='/department' component={() => <Department 
              departments={this.props.departments.departments}
            /> }/>
            <Route path='/departments/:departmentId' component={departmentId} />
            <Route exact path='/salary' component={() => <Salary 
              staffs={this.props.staffs.staffs}
            />} />
            <Redirect to='/staff' />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));