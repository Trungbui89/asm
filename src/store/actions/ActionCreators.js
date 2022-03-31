import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

// add staffs from server

export const fetchStaffs = () => (dispatch) => {

    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

// add departments from server

export const fetchDepartments = () => (dispatch) => {

    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

// post new staff to server

export const addNewStaff = (staff) => ({
    type: ActionTypes.ADD_NEW_STAFF,
    payload: staff
});

export const postStaff = (
        id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary
    ) => (dispatch) => {

    const newStaff = {
        id: id, 
        name: name,
        doB: doB,
        salaryScale: salaryScale,
        startDate: startDate,
        departmentId: departmentId,
        annualLeave: annualLeave,
        overTime: overTime,
        image: image,
        salary: salary
    }

    return fetch(baseUrl + 'staffs',{
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(staff => {
      dispatch(addNewStaff(staff))
    })
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
}

// edit staff infomation

export const editStaff = (staffs) => ({
  type: ActionTypes.EDIT_STAFF,
  payload: staffs
});

export const patchStaff = (
  id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary
) => (dispatch) => {

  const updatedStaff = {
    id: id, 
    name: name,
    doB: doB,
    salaryScale: salaryScale,
    startDate: startDate,
    departmentId: departmentId,
    annualLeave: annualLeave,
    overTime: overTime,
    image: image,
    salary: salary
  }

  return fetch(baseUrl + 'staffs',{
    method: 'PATCH',
    body: JSON.stringify(updatedStaff),
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        var errmess = new Error(error.message);
        throw errmess;
  })
  .then(response => response.json())
  .then(staffs => {
    dispatch(editStaff(staffs))
  })
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
}

// delete staff

export const deleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + `staffs/${id}`,{
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        var errmess = new Error(error.message);
        throw errmess;
  })
  .then(response => response.json())
  .then(staffs => {
    dispatch(addStaffs(staffs))
  })
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
}