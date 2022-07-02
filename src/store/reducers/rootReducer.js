import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AddStaffFormsFeedback } from './addStaffForms';
import { createForms } from 'react-redux-form';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { EditStaffFormsFeedback } from './editStaffForms'
import { Salaries } from './salary';

export const rootReducer = () => {
  const store = createStore(
      combineReducers({
          staffs: Staffs,
          departments: Departments,
          salaries: Salaries,
          ...createForms({
              feedback: AddStaffFormsFeedback,
              updateFeedBack: EditStaffFormsFeedback
          }),
      }),
      applyMiddleware(thunk, logger)
  );

  return store;
}