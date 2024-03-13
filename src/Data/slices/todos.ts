import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import supabase from "../../Utils/api";

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

type removeTodoQueries = {
  id: number;
};

type addTodoQueries = {
  text: string;
};

export const getAllTodos = createAsyncThunk("todos/getAllTodos", async (_, thunkAPI) => {
  try {
    const { data, error } = await supabase.from("todos").select("*");
    if (!error) {
      return data;
    }
    throw new Error(error.message);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : err);
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (queries: addTodoQueries, thunkAPI) => {
  try {
    const { error } = await supabase.from("todos").insert([{ text: queries.text }]);

    if (!error) {
      return toast.success("Todo added successfuly");
    }
    throw new Error(error.message);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : err);
  }
});

export const setTodoDone = createAsyncThunk("todos/setTodoDone", async (queries: removeTodoQueries, thunkAPI) => {
  try {
    const { error } = await supabase.from("todos").update({ done: true }).eq("id", queries.id);
    if (!error) {
      return toast.success("Todo updated successfuly");
    }
    throw new Error(error.message);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : err);
  }
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (queries: removeTodoQueries, thunkAPI) => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", queries.id);

    if (!error) {
      return toast.success("Todo removed successfuly");
    }
    throw new Error(error.message);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : err);
  }
});

const slice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to fetch data";
      });

    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to add todo";
      });
    builder
      .addCase(setTodoDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setTodoDone.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setTodoDone.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to update todo";
      });
    builder
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to remove todo";
      });
  },
});

export const reducer = slice.reducer;
export default slice;
