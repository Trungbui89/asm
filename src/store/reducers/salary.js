import * as ActionTypes from '../actions/ActionTypes'

export const Salaries = (state = {
    isLoading: true,
    errMess: null,
    salaries: []
}, action) => {
    switch (action.type) {
        case ActionTypes.RENDER_SALARY:
            return {...state, isLoading: false, salaries: action.payload}

        case ActionTypes.RENDER_SALARY_FAILED:
            return {...state, isLoading:false, errMess: action.payload}

        case ActionTypes.RENDER_SALARY_LOADING:
            return {...state, isLoading:true}

        default: return state
    }
}