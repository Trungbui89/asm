import * as ActionTypes from '../actions/ActionTypes';

export const Staffs = (state = { 
        isLoading: true,
        errMess: null,
        staffs:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};

        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffs: []};

        default:
            return state;
    }
};

// const initState = {
//     infos: STAFFS.concat(addNewStaffs),
//     department: DEPARTMENTS
// }
// const rootReducer = (state = initState, action) => {

//   switch (action.type) {
//     case 'add_staff':
//       let infos = state.infos
//       infos = infos.concat(action.payload)
//       return {
//         ...state, infos
//       }
  
//     default:
//       return state
//   }
// }