import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todo/todoSlice';
import userReducer from './user/userSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});