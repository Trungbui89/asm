import * as ActionTypes from '../actions/ActionTypes';

export const Departments = (state = { 
        isLoading: true,
        errMess: null,
        departments:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENTS:
            return {...state, isLoading: false, errMess: null, departments: action.payload};

        case ActionTypes.DEPARTMENTS_LOADING:
            return {...state, isLoading: true}

        case ActionTypes.DEPARTMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}