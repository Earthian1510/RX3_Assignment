import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://backend-students.vercel.app/students";

// GET
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

// POST
export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (studentData) => {
    const response = await axios.post(BASE_URL, studentData);
    return response.data;
  }
);

// UPDATE
export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async (studentData) => {
    const response = await axios.put(
      `${BASE_URL}/${studentData._id}`,
      studentData
    );
    return response.data;
  }
);

// DELETE
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    filter: "all",
    sortBy: "name",
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      (state.status = "success"), (state.students = action.payload);
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      (state.status = "error"), (state.error = action.error.message);
    });

    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    });
  },
});

export const { setFilter, setSortBy } = studentSlice.actions;
export default studentSlice.reducer;
