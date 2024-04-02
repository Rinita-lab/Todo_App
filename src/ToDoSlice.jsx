//creating a slice
import { createSlice } from "@reduxjs/toolkit";
//defining our initial state
const initialState = {
  todoList: [],
  sortCriteria: "All",
};

const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  //all our reducers or functionalities required
  reducers: {
    //setting the todo list
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    //adding a task with data, id and initially marked as not complete
    addTodo: (state, action) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    //filtering of tasks(all, completed, not completed)
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    //updating the task where current id matches an existing id
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].task = task;
    },
    //marks whether a task is completed or not without deleting them
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = !state.todoList[index].completed;
    },
  },
});

//exporting the functionalities to be used in other modules
export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } = ToDoSlice.actions;

export default ToDoSlice.reducer;