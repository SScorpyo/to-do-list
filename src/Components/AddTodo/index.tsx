import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Utils/hooks";
import { addTodo } from "../../Data/slices/todos";

const AddToDo: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    const todoString = inputRef.current?.value;
    if (!todoString || todoString === "" || todoString === null) {
      return toast.error("Invalid todo string");
    }
    dispatch(addTodo({ text: todoString }));
  };

  return (
    <div className="add-todo-item flex gap-2 items-center h-10 mt-6">
      <input ref={inputRef} className="bg-gray-700 text-white grow h-full p-3" type="text" placeholder="Whats up ? ..." />
      <button onClick={() => handleAddTodo()} className="bg-gray-700 grow-0 h-full flex justify-center items-center" style={{ aspectRatio: "1/1" }}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
      </button>
    </div>
  );
};

export default AddToDo;
