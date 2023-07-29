import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/login";
import DashBoard from "./Components/DashBoard";
import NavBar from "./Components/navBar";
import Dummy from "./Components/Dummy";
import Edit from "./Components/edit";
import AdminHomePage from "./Components/Admin Panel/AdminMainPage";
import "./Components/FontAwesome";
import "./App.css";
import ViewClientPublications from "./Components/ViewClientPublications";
import ViewProfBody from "./Components/ViewProfBody";
import Honours from "./Components/Honours";
import PDFPage from "./Components/Admin Panel/PDFPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="/adminHome" element={<AdminHomePage />} />
        <Route
          path="/clientPublications"
          element={<ViewClientPublications />}
        />
        <Route path="/profBody" element={<ViewProfBody />} />
        <Route path="/honours" element={<Honours />} />
        <Route path="/PDFPage" element={<PDFPage />} />
      </Routes>
    </Router>
  );
}

export default App;
