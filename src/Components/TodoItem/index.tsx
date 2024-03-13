import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../Utils/hooks";
import { getAllTodos, removeTodo, setTodoDone } from "../../Data/slices/todos";

type todoItemPropTypes = { id: number; text: string; done: boolean };

const TodoItem = ({ id, text, done }: todoItemPropTypes) => {
  const dispatch = useAppDispatch();
  const handleSetTodoDone = (id: number) => {
    dispatch(setTodoDone({ id: id }));
    dispatch(getAllTodos());
  };
  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo({ id: id }));
    dispatch(getAllTodos());
  };
  return (
    <div className="todo-item flex items-center	justify-between pl-1.5 pr-1.5 h-10">
      <p className={`${done ? "line-through text-gray-300" : "text-gray-400"}`}>{text}</p>
      <div className="flex justify-center items-center gap-5">
        <button
          onClick={() => {
            handleSetTodoDone(id);
          }}
        >
          <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
        </button>
        <button
          onClick={() => {
            handleRemoveTodo(id);
          }}
        >
          <FontAwesomeIcon icon={faX} style={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
