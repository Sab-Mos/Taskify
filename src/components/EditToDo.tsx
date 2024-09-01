import React, { useState } from "react";
import { type Todo } from "../model";
import { useToDoContext } from "../context/ContextProvider";

type Props = {
  note: Todo;
};

export default function EditToDo({ note }: Props) {
  const { addEditedNote } = useToDoContext();

  const [value, setValue] = useState<string>(note.body);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    addEditedNote(note.id, value);
  };

  return (
    <form
      className="flex justify-center items-center mb-10 border border-black p-5 rounded-md border-opacity-20 dark:border-white dark:border-opacity-60"
      onSubmit={handleSubmit}
    >
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className="py-2 px-2 rounded-l-lg outline-none bg-[#eef1f1]"
      />
      <button className="text-white bg-black px-3 py-2 rounded-r-lg font-bold hover:bg-white hover:text-black hover:ring-black hover:ring-1 font-[roboto]">
        Edit Task
      </button>
    </form>
  );
}
