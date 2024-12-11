import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import ProfilePage from "./pages/profilePage/profilePage";
import BookingPage from "./pages/bookingPage/bookingPage";
import LoginPage from "./pages/loginPage/loginPage";
import SignUpPage from "./pages/signupPage/signUpPage";
import AdminPanel from "./pages/adminPanel/adminPanel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* Другие маршруты */}
      </Routes>
    </Router>
  );
};

export default App;
