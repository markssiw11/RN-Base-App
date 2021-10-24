import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export default combineReducers({
  counter: counterReducer,
});
