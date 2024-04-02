import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../ToDoSlice";
//setting up store
const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});

export default store;