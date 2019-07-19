import { combineReducers } from 'redux';

const INITIAL_STATE = {
  jwt: "start",
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
        console.log("inside tokenReducer")
        return { jwt: action.payload}
    default:
      return state
  }
};

export default combineReducers({
  token: tokenReducer,
});

