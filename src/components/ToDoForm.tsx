import { useState } from "react";

type Props = {
  addToDo: (text: string) => void;
};

export default function ToDoForm({ addToDo }: Props) {
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

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className=" py-2 px-2 rounded-l-lg  outline-none  bg-[#eef1f1]"
      />
      <button className="text-white bg-black px-3 py-2 rounded-r-lg font-bold hover:bg-white hover:text-black hover:ring-black hover:ring-1 ">
        Add Task
      </button>
      {error && (
        <p className="text-red-600 mt-2  text-center font-bold">
          No task to add
        </p>
      )}
    </form>
  );
}
