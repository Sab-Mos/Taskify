import { useToDoContext } from "../context/ContextProvider";

export default function ToDoForm() {
  const { handleSubmit, handleChange, value, error } = useToDoContext();

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="flex items-center">
        <input
          value={value}
          onChange={handleChange}
          type="text"
          className=" py-2 px-2 rounded-l-lg  outline-none  bg-[#eef1f1]"
        />
        <button className="text-white bg-black p-[9px] rounded-r-lg font-bold hover:bg-white hover:text-black hover:ring-black hover:ring-1 ">
          Add Task
        </button>
      </div>
      {error && (
        <p className="text-red-600 mt-2  text-center font-bold">
          No task to add
        </p>
      )}
    </form>
  );
}
