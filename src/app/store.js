import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import bookReducer from '../features/BookSlice';

export const store = configureStore({
  reducer: combineReducers({
      bookStore : bookReducer,
  }),
});