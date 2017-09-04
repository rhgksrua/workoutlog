import moment from 'moment';

import { SET_DATE } from '../actions/actionTypes';

const today = moment();
const dateInitial = {
  year: today.year(),
  month: today.month(),
  date: today.date()
};

function currentDate(state = dateInitial, action) {
  switch(action.type) {
    case SET_DATE:
      const { year, month, date } = action;
      return { ...state, year, month, date };
    default:
      return state;
  }
}

export default currentDate;
