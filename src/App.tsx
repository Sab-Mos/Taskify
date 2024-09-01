import "./App.css";
import { ToDoWrapper } from "./components";
import { useToDoContext } from "./context/ContextProvider";

function App() {
  const { darkMode } = useToDoContext();
  return (
    <div className={`${darkMode && "dark"}`}>
      <div
        className={`flex justify-center min-h-screen ring bg-[#dee0e1] dark:bg-[#1e293b] min-w-screen transition-colors duration-300`}
      >
        <div>
          <ToDoWrapper />
        </div>
      </div>
    </div>
  );
}

export default App;
