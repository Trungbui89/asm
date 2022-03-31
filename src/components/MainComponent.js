import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staffs from './staffPage/StaffListComponent';
import StaffDetail from './staffPage/StaffDetail';
import Department from './DepartmentComponent';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';
import { fetchStaffs, fetchDepartments, postStaff } from '../store/actions/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  postStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) =>
    dispatch(postStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary))
})

// main class

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs()
    this.props.fetchDepartments()
  }

  // render

  render() {
    const StaffId = ({match}) => {
      console.log(this.props)

      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} 
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          department={this.props.departments.departments.filter((department) => 
              department.id === this.props.staffs.staffs[parseInt(match.params.staffId,10)].departmentId)[0]}
          departmentLoading={this.props.departments.isLoading}
          departmentErrMess={this.props.departments.errMess}
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