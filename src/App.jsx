import Heading from "./components/Heading";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className=" py-16 px-6 h-60 w-4/6 m-auto bg-[#ffe4e6]">
      <Heading />
      <ToDoList />
    </div>
  );
}

export default App;