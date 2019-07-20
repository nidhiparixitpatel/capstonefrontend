import { combineReducers } from 'redux';
import { getActiveChildNavigationOptions } from 'react-navigation';

const INITIAL_STATE = {
  jwt: "need to get",
  email: "not set yet",
  id: "still need to get",
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return { ...state, jwt: action.payload}
    
    case 'ADD_EMAIL': 
      return {...state, email: action.payload}
    
    case 'ADD_ID': 
      return {...state, id: action.payload}

    default:
      return state
  }

};

export default combineReducers({
  token: tokenReducer,
});

