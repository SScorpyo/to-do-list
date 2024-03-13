import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToDo from "../AddTodo";
import TodoItem from "../TodoItem";
import InfoCard from "../InfoCard";
import { useAppDispatch, useAppSelector } from "../../Utils/hooks";
import { getAllTodos } from "../../Data/slices/todos";
import { useEffect } from "react";

const TodoList = () => {
  const infoCardsData = [
    { type: "Active Session", value: "16 minutes", progress: 23.36 },
    { type: "Added", value: "4 items", progress: -9.05 },
    { type: "Completed", value: "2 items", progress: 12.26 },
    { type: "Edited", value: "3 times", progress: -124.05 },
  ];

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const { data } = useAppSelector((state) => state.todos)

  return (
    <div className="todo-container h-screen w-screen bg-slate-800 flex justify-center items-center">
      <div className="todo-list gap-5 flex flex-col items-center">
        <div className="w-min">
          <div className="flex content-center items-center text-white font-medium gap-6 pr-48">
            <FontAwesomeIcon className="size-32" icon={faSquareCheck} bounce style={{ color: "#00bb64" }} />
            <p className="text-6xl">Todolist</p>
          </div>
          <AddToDo />
          <div className="todo-items bg-slate-800 mt-3 mb-6">
            {data.map((todoItem, index) => (
              <TodoItem key={index} id = {todoItem.id} text={todoItem.text} done = {todoItem.done} />
            ))}
          </div>
        </div>
        <hr className="border-2 border-gray-700 w-full" />
        <div className="info-container flex gap-5 pl-8 pr-8">
          {infoCardsData.map((infoItem, index) => (
            <InfoCard key={index} {...infoItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TodoList;
