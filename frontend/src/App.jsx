import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Add from "./pages/Add";
import View from "./pages/View";
import About from "./pages/About";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Setting";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useState,useEffect } from "react";

export default function App() {
   const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <BrowserRouter>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}  />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<About darkMode={darkMode}/>} />
        <Route path="/about" element={<About darkMode={darkMode}/>} />
        <Route path="/login" element={<Login darkMode={darkMode}/>} />
        <Route path="/register" element={<Register darkMode={darkMode}/>} />

        {/* Protected Routes (Login required) */}
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/add"
          element={
            <ProtectedRoute>
              <Add darkMode={darkMode}/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/view"
          element={
            <ProtectedRoute>
              <View darkMode={darkMode}/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/setting"
          element={
            <ProtectedRoute>
              <Settings darkMode={darkMode}/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer darkMode={darkMode} />
    </BrowserRouter>
  );
}
