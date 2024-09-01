// ToDo.tsx
import { type Todo } from "../model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCircleCheck,
  faPenToSquare,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-regular-svg-icons";
import { useToDoContext } from "../context/ContextProvider";

type Props = {
  id: string;
  note: Todo;
  index: number;
};

export default function ToDo({ id, index, note }: Props) {
  const {
    removeNote,
    handleComplete,
    moveNoteUp,
    moveNoteDown,
    editNote,
    notes,
  } = useToDoContext();

  return (
    <div
      className={`flex justify-between gap-5 items-center mb-10 border border-black p-5 rounded-md border-opacity-20
      transition-all duration-300 dark:bg-[#494c5d] dark:border-white dark:border-opacity-50 
      ${note.isComplete && "opacity-50"}`}
    >
      <p
        className={`text-xl dark:text-white font-[roboto] break-all md:break-words ${
          note.isComplete ? "line-through " : null
        }`}
      >
        {note.body}
      </p>
      <div className="flex gap-2">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className={`text-xl cursor-pointer dark:text-white  transition-colors duration-300" ${
            note.isComplete && "text-green-600 dark:text-green-600 "
          }`}
          onClick={() => handleComplete(id)}
        />
        {notes.length > 1 && (
          <>
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className="text-xl  cursor-pointer transition-colors duration-300 hover:text-yellow-400 dark:text-white hover:dark:text-yellow-400"
              onClick={() => moveNoteDown(index)}
            />
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              className="text-xl  cursor-pointer transition-colors duration-300 hover:text-yellow-400 hover:dark:text-yellow-400 dark:text-white"
              onClick={() => moveNoteUp(index)}
            />
          </>
        )}
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-xl  cursor-pointer transition-colors duration-300 hover:text-violet-600 dark:text-white hover:dark:text-violet-600"
          onClick={() => {
            console.log(`Editing note with id: ${id}`);
            editNote(id);
          }}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-xl cursor-pointer hover:text-red-400 transition-colors duration-300 dark:text-white hover:dark:text-red-400"
          onClick={() => removeNote(id)}
        />
      </div>
    </div>
  );
}
