import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./userService";

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValues, toast }, { rejectWithValue }) => {
    try {
      const response = await service.register(formValues);
      toast.success("Registration Done !");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValues, navigate }, { rejectWithValue }) => {
    try {
      const response = await service.login(formValues);
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    // register extraReducers
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // login extraReducers
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = true;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setLogout } = userSlice.actions;

export default userSlice.reducer;
