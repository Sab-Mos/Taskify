import { useEffect, useState } from "react";
import "./App.css";
import { ToDoWrapper } from "./components";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedData: string | null = localStorage.getItem("darkMode");
    return storedData ? JSON.parse(storedData) : false;
  });

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedData: string | null = JSON.stringify(darkMode);
    localStorage.setItem("darkMode", savedData);
  }, [darkMode]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <div
        className={`flex justify-center min-h-screen ring bg-[#dee0e1] dark:bg-[#1e293b] min-w-screen transition-colors duration-300`}
      >
        <div>
          <ToDoWrapper handleDarkMode={handleDarkMode} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
