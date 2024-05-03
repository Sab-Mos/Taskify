import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import ToDoForm from "./ToDoForm";
import { type Todo } from "../model";
import { v4 } from "uuid";
import ToDo from "./ToDo";
import EditToDo from "./EditToDo";

type Props = {
  handleDarkMode: () => void;
  darkMode: boolean;
};

export default function ToDoWrapper({ handleDarkMode, darkMode }: Props) {
  const [notes, setNotes] = useState<Todo[]>(() => {
    const storedData: string | null = localStorage.getItem("taskData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const addToDo = (text: string) => {
    setNotes((prevNotes) => [
      { id: v4(), body: text, isComplete: false, isEdited: false },
      ...prevNotes,
    ]);
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleComplete = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isComplete: !note.isComplete } : note
      )
    );
  };

  const moveNoteUp = (index: number) => {
    const newArray: Todo[] = [...notes];
    if (index === 0) return;
    [newArray[index - 1], newArray[index]] = [
      newArray[index],
      newArray[index - 1],
    ];
    setNotes(newArray);
  };

  const moveNoteDown = (index: number) => {
    const newArray: Todo[] = [...notes];
    if (index === newArray.length - 1) return;
    [newArray[index], newArray[index + 1]] = [
      newArray[index + 1],
      newArray[index],
    ];

    setNotes(newArray);
  };

  const editNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEdited: !note.isEdited } : note
      )
    );
  };

  const addEditedNote = (id: string, text: string) => {
    const editedNote = notes.find((note) => note.id === id);

    if (!editedNote) return;

    const updatedNote: Todo = {
      ...editedNote,
      body: text,
      isEdited: false,
    };
    const updatedArray: Todo[] = notes.filter((note) => note.id !== id);

    setNotes([updatedNote, ...updatedArray]);
  };

  useEffect(() => {
    const data: string | null = JSON.stringify(notes);
    localStorage.setItem("taskData", data);
  }, [notes]);

  return (
    <div className="my-20 w-96 bg-[#fff] rounded-lg flex flex-col items-center py-4  dark:bg-[#141c2f] relative transition-colors duration-300">
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
      <ToDoForm addToDo={addToDo} />
      <div className="w-full px-2 mt-8">
        {notes.map((note, index) =>
          note.isEdited ? (
            <EditToDo key={note.id} addEditedNote={addEditedNote} note={note} />
          ) : (
            <ToDo
              key={note.id}
              note={note}
              removeNote={() => removeNote(note.id)}
              handleComplete={() => handleComplete(note.id)}
              moveNoteUp={() => moveNoteUp(index)}
              moveNoteDown={() => moveNoteDown(index)}
              editNote={() => editNote(note.id)}
            />
          )
        )}
      </div>
    </div>
  );
}
