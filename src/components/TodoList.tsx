import { useEffect, useState } from "react";
import { useAppSelector } from "../hook";
import DoneItem from "./DoneItem";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodoList } from "../store/todoSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(selectTodoList);

  const dispatchThunk = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  useEffect(() => {
    dispatchThunk(fetchTodos())
      .then((result) => {
        // Обработка успешного выполнения fetchTodos()
        console.log("Данные получены:", result);
      })
      .catch((error) => {
        // Обработка ошибки при выполнении fetchTodos()
        console.error("Ошибка при получении данных:", error);
      });
  }, [dispatch]);

  // !!!!!!

  const todos = useAppSelector((state) => state.todos.list);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "344px",
          height: "min-content",
          backgroundColor: "rgb(125, 171, 250)",
          padding: "0 20px",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <h2 style={{ color: "white" }}>
          Active :{" "}
          {todos.filter((todo: Todo) => todo.completed == false).length}
        </h2>
        {todos.filter((todo) => todo.completed == false).length === 0 && (
          <span style={{ color: "white", paddingTop: "-30px" }}>
            Here is just empty
          </span>
        )}

        {todos.map((todo: Todo) => {
          if (!todo.completed) {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TodoItem key={todo.id} {...todo} />
              </div>
            );
          }
        })}
      </div>
      <div
        style={{
          backgroundColor: "rgb(45, 172, 43) ",
          width: "344px",
          height: "min-content",
          padding: "0 20px",
          borderRadius: "0 0 10px 10px",
          // marginRight: "100px",
        }}
      >
        <h2 style={{ color: "white" }}>
          Done : {todos.filter((todo: Todo) => todo.completed == true).length}
        </h2>
        {todos.filter((todo: Todo) => todo.completed == true).length === 0 && (
          <span style={{ color: "white" }}>Here is just empty</span>
        )}

        {todos.map((todo: Todo) => {
          if (todo.completed) {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DoneItem key={todo.id} {...todo} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TodoList;
