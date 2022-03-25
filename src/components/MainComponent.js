import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Staff from './StaffListComponent';
import StaffDetail from './StaffDetail';
import Department from './DepartmentComponent';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

class Main extends React.Component {

  StaffId = ({match}) => {
    return (
      <StaffDetail staff={this.props.infos.filter((info) => info.id === parseInt(match.params.staffId,10))[0]} />
    )
  }

  render() {
    return (
      <div className="Main">
        <Header />
          <Switch>
            <Route exact path='/staff' component={() => 
              <Staff 
                staffs={this.props.infos} 
                departments={this.props.department} 
                mainComptSetState={this.props.mainComptSetState}
              />
            }/>
            <Route path='/staff/:staffId' component={this.StaffId} />
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

const mapStateToProps = (state) => {
  return {
    infos: state.infos,
    department: state.department
  }  
}

const mapDispatchToProps = (dispatch) => {
  return {
    mainComptSetState: (addNewStaff) => {
      dispatch({type: 'add_staff', payload: addNewStaff})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));