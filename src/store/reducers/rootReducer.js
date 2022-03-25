import { STAFFS, DEPARTMENTS } from '../../shared/staffs';

  let addNewStaffs = []
  if(window.localStorage.getItem('newStaffs')){
    addNewStaffs = window.localStorage.getItem('newStaffs').split(';').map((staff) => {
      return JSON.parse(staff)
    })
  }

const initState = {
    infos: STAFFS.concat(addNewStaffs),
    department: DEPARTMENTS
}
const rootReducer = (state = initState, action) => {

  switch (action.type) {
    case 'add_staff':
      let infos = state.infos
      infos = infos.concat(action.payload)
      return {
        ...state, infos
      }
  
    default:
      return state
  }
}

export default rootReducer