import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../redux/reducers/dateReducer';


const store = configureStore({
  reducer: {
    date: dateReducer, // Название состояния date в Redux
  },
});

export default store;