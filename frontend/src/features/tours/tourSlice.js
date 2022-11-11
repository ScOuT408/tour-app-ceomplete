import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./tourService";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ tourData, toast }, { rejectWithValue }) => {
    try {
      const response = await service.addtour(tourData);
      toast.success("Tour Added Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getTours();
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await service.getToursByUser(userId);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast }, { rejectWithValue }) => {
    try {
      const response = await service.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await service.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await service.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    // tours extraReducers
    [createTour.pending]: (state) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // get tours extraReducers
    [getTours.pending]: (state) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // get tours by user extraReducers
    [getToursByUser.pending]: (state) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // get tours by user extraReducers
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [searchTours.pending]: (state) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tourSlice.reducer;
