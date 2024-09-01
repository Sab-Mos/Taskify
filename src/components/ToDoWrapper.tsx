import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import EditToDo from "./EditToDo";
import { useToDoContext } from "../context/ContextProvider";

export default function ToDoWrapper() {
  const { handleDarkMode, darkMode, notes } = useToDoContext();

  // const editNote = (id: string) => {
  //   setNotes((prev) =>
  //     prev.map((note) =>
  //       note.id === id ? { ...note, isEdited: !note.isEdited } : note
  //     )
  //   );
  // };

  // const addEditedNote = (id: string, text: string) => {
  //   const editedNote = notes.find((note) => note.id === id);

  //   if (!editedNote) return;

  //   const updatedNote: Todo = {
  //     ...editedNote,
  //     body: text,
  //     isEdited: false,
  //   };
  //   const updatedArray: Todo[] = notes.filter((note) => note.id !== id);

  //   setNotes([updatedNote, ...updatedArray]);
  // };

  return (
    <div className="my-20 w-[340px] px-3 md:w-[600px] md:px-5 bg-[#fff] rounded-lg flex flex-col items-center py-4  dark:bg-[#141c2f] relative transition-colors duration-300">
      <h1 className="text-3xl  dark:text-white font-[roboto]">Taskify</h1>
      <button
        className="text-white absolute right-4 top-3"
        onClick={handleDarkMode}
      >
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} size="xl" />
        ) : (
          <FontAwesomeIcon icon={faMoon} size="xl" className="text-black" />
        )}
      </button>
      <ToDoForm />
      <div className="w-full px-2 mt-8">
        {notes.map((note, index) =>
          note.isEdited ? (
            <EditToDo key={note.id} note={note} />
          ) : (
            <ToDo key={note.id} id={note.id} note={note} index={index} />
          )
        )}
      </div>
    </div>
  );
}
