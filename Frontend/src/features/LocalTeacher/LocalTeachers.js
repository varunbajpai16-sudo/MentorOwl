import { createSlice } from "@reduxjs/toolkit";

const stordteacher = localStorage.getItem("localTeachers");
const initialState = {
  teachers: stordteacher && stordteacher !== "undefined" ? JSON.parse(stordteacher) : [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
      state.loading = false;
      state.error = null;
    },

    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },

    clearTeachers: (state) => {
      state.teachers = [];
    },

    setTeacherLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTeacherError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTeachers,
  addTeacher,
  clearTeachers,
  setTeacherLoading,
  setTeacherError,
} = teacherSlice.actions;

export default teacherSlice.reducer;