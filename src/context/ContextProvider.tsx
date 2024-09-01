import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { type Todo } from "../model";
import { v4 } from "uuid";
type Props = {
  children: React.ReactNode;
};

type contextProviderTypes = {
  darkMode: boolean;
  notes: Todo[];
  handleDarkMode: () => void;
  addToDo: (text: string) => void;
  removeNote: (id: string) => void;
  handleComplete: (id: string) => void;
  moveNoteUp: (index: number) => void;
  moveNoteDown: (index: number) => void;
  editNote: (id: string) => void;
  addEditedNote: (id: string, text: string) => void;
  value: string;
  error: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNotes: React.Dispatch<
    React.SetStateAction<
      {
        body: string;
        id: string;
        isComplete: boolean;
        isEdited: boolean;
      }[]
    >
  >;
};

const contextProvider = createContext<contextProviderTypes | null>(null);

export const useToDoContext = () => {
  const context = useContext(contextProvider);
  if (!context) {
    throw new Error("Error while setting context");
  }
  return context;
};

function ContextProvider({ children }: Props) {
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

  const [value, setValue] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    addToDo(value);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const data: string | null = JSON.stringify(notes);
    localStorage.setItem("taskData", data);
  }, [notes]);
  return (
    <contextProvider.Provider
      value={{
        darkMode,
        handleDarkMode,
        notes,
        addToDo,
        removeNote,
        handleComplete,
        moveNoteUp,
        moveNoteDown,
        editNote,
        addEditedNote,
        handleChange,
        handleSubmit,
        value,
        error,
        setNotes,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export default ContextProvider;
