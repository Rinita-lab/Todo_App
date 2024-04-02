import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import functionalities
import {
  setTodoList,
  addTodo,
  updateTodo,
  sortTodo,
  toggleCompleted,
} from "../ToDoSlice";

//icons
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";

//image
import notask from "../assets/notask.png";


function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  //initial configurations
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  //has tasks, store in local storage, useEffect() hook is called whenever change in todoList
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  //gets the existing todo list from local storage(if exists) on first render[Implementing persistent storage]
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  //handler checks if value is not empty
  //if valid value found, adds task to todo with unique id(Date.now() is always unique)
  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(true);
    }
  };

  //handler checks if value is not empty
  //if valid value found, updates task to todo and closes modal
  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setCurrentTodo("");
      setNewTask("");
      setShowModal(false);
    }
  };

  //handler gets the updated todo task list(except the one to be deleted) and sets in local storage
  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  //handler sets the status(all, completed, not completed)
  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria));
  }

  //filtering of tasks based on sortCriteria
  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  //toggling handler to mark completed tasks without deleting them
  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  return (
    <div>
       {/* modal open*/}
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">

             {/*entering the task */}
            <input
              className="border p-2 rounded-md outline-none mb-8"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your task here..." : "Enter your task here..."
              }
            />

            <div className="flex justify-between">
               {/* if there exists a current todo value, we are updating*/}
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateToDoList(currentTodo.id, newTask);
                    }}
                    className="bg-[#fb7185] text-white py-3 px-10 rounded-md mx-3">
                    Save
                  </button>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10 mx-3"
                    onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                 {/* if there is no current todo value, we are adding a new task*/}
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10 mx-3"
                    onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="bg-[#fb7185] text-white py-3 px-10 rounded-md mx-3"
                    onClick={() => {
                      handleAddTodo(newTask);
                      setShowModal(false);
                    }}>
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}


       
      <div className=" flex items-center justify-center flex-col">
         {/* if there are no tasks, set the image */}
        {todoList.length === 0 ? (
          <div className="mb-6">
            <div className="min-w-[250px] min-[250px]">
              <img src={notask} alt="" className="h-11/12 w-11/12"/>
            </div>
            <p className="text-center text-Gray">
              You have no todo's, please add one.
            </p>
          </div>
        ) : (
          //if there are tasks, show the list of tasks
          <div className="container mx-auto mt-6">
            <div className="flex justify-center mb-6">
               {/* filtering tasks*/}
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="px-6 py-3 outline-none text-sm rounded-lg text-[#fb7185]">
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
              </select>
            </div>


            {/* shows tasks using map function( like creating multiple cards with different values)*/}
            <div className="mt-10">
              {sortToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between mb-6 bg-slate-700 mx-auto w-full md:w-[75%] rounded-md p-4">
                   {/* toggle between completed or not by clicking on the task name*/}
                  <div
                    className={`${
                      todo.completed
                        ? "line-through text-greenTeal"
                        : "text-[#fb7185]"
                    }`}
                    onClick={() => {
                      handleToggleCompleted(todo.id);
                    }}>
                    {todo.task}
                  </div>
                  <div>
                     {/* update button*/}
                    <button
                      className=" bg-blue-300 text-white p-1 rounded-md ml-2"
                      onClick={() => {
                        setShowModal(true);
                        setCurrentTodo(todo);
                        setNewTask(todo.task);
                      }}>
                      <TiPencil />
                    </button>

                     {/* delete button*/}
                    <button
                      className="bg-[#fb7185] text-white p-1 rounded-md ml-2"
                      onClick={() => handleDeleteToDo(todo.id)}>
                      <BsTrash />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {/* add task button which opens modal*/}
        <button
          className="bg-[#fb7185] text-center text-white py-3 px-10 rounded-md mb-12"
          onClick={() => {
            setShowModal(true);
          }}>
          Add Task
        </button>


      </div>
    </div>
  );
}

export default TodoList;

