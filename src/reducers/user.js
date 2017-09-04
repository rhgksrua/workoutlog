import {
  ADD_USER,
  LOG_OUT,
  IS_OWNER,
  NOT_OWNER,
  PENDING_USER,
} from '../actions/actionTypes';

const userInitialState = {
  dirty: false,
  pending: false,
  username: '',
  owner: false
};

function user(state = userInitialState, action) {
  switch(action.type) {
    case PENDING_USER:
      return { ...state, pending: true, dirty: true };
    case ADD_USER:
      return { 
        ...state, 
        username: action.payload.username, 
        owner: action.payload.owner, 
        pending: false, 
        dirty: true 
      };
    case LOG_OUT:
      return { ...state, username: '', owner: false, pending: false, dirty: true };
    case NOT_OWNER:
      return { ...state, owner: false, pending: false, dirty: true };
    case IS_OWNER:
      // checks if user is the owner of the current page.
      return { ...state, owner: action.owner, pending: false, dirty: true }
    default:
      return state;
  }
}

export default user;
