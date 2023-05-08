import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { error } from "console";
import { RootState } from "./Index";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
  status: string | null;
  error: string | null;
};

const initialState: TodosState = {
  list: [],
  status: null,
  error: null,
};

const API = "http://localhost:8000/posts";

export const fetchTodos = createAsyncThunk("/todos/fetchTodos", async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTodo: Todo = {
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      };
      state.list.push(newTodo);
      axios.post(API, newTodo);
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
        axios.put(`${API}/${toggledTodo.id}`, toggledTodo);
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      state.list = state.list.filter((todo) => todo.id !== todoId);
      axios.delete(`${API}/${todoId}`);
    },
    editTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload;
      const todoToEdit = state.list.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = title;
        axios.put(`${API}/${id}`, todoToEdit);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = null;
        console.log("error reject");

        // state.error = action.error.message;
      });
  },
});

export const selectTodoList = (state: RootState) => state.todos.list;

export const { addTodo, toggleComplete, removeTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
