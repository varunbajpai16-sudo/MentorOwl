import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.silice"
import teacherReducer from "../features/Teacher/Teacher_slice"
import studentReducer from "../features/Student/Student_Slice"
import parentReducer from "../features/Parent/Parent_slice"
import teachersReducer from "../features/LocalTeacher/LocalTeachers"
export const store = configureStore({
    reducer:{
    auth:authReducer,
    teacher:teacherReducer,
    student:studentReducer,
    parent:parentReducer,
    teachers:teachersReducer,
    }
});