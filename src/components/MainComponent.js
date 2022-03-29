import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staffs from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DepartmentComponent';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';
import { fetchStaffs } from '../store/actions/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs
  }  
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
})

class Main extends React.Component {

  componentDidMount() {
    this.props.fetchStaffs()
  }

  render() {
    const StaffId = ({match}) => {
      return (
        <StaffDetail staff={this.props.infos.filter((info) => info.id === parseInt(match.params.staffId,10))[0]} />
      )
    }

    const Staffs = () => {
      console.log(this.props.staffs)
      return(
        <Staffs 
          staffs={this.props.staffs} 
          departments={this.props.department} 
          mainComptSetState={this.props.mainComptSetState}
        />
      )
    }

    return (
      <div className="Main">
        <Header />
          <Switch>
            <Route exact path='/staff' component={Staffs}/>
            <Route path='/staff/:staffId' component={StaffId} />
            <Route exact path='/department' component={() => <Department 
            departments={this.props.department}
            /> }/>
            <Route exact path='/salary' component={() => <Salary 
            staffs={this.props.infos}
            />} />
            <Redirect to='/staff' />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));