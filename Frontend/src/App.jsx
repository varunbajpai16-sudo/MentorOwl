import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import FindTeachersPage from "./pages/FindTeacher"
import SubjectsPage from "./pages/Subject"
import BecomeATeacher from "./pages/BecomeTeacher"
import LoginPage from "./pages/loginpage"
import HowItWorks from "./pages/About"
import SignupPage from "./pages/signup"
import TeacherProfile from "./pages/TeacherProfile"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findteacher" element={<FindTeachersPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/becomeateacher" element={<BecomeATeacher />} />
        <Route path="/login" element={< LoginPage/>} />
        <Route path="/howitwork" element={< HowItWorks/>} />
         <Route path="/signup" element={< SignupPage/>} />
         <Route path="/teacherprofile" element={< TeacherProfile/>} />
      </Routes>
    </>
  );
}

export default App;
