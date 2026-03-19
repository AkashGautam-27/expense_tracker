import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login({ darkMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://expense-tracker-awv8.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setPopup({ show: true, message: data.message || "Login failed" });
        return;
      }

      // Save data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id || data.user._id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);

      setPopup({ show: true, message: "Login Successful!" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      setPopup({ show: true, message: "Server error" });
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-100dvh relative pt-15 pb-10
        ${darkMode ? "bg-gray-900" : "bg-gray-200"}
      `}
    >
      {/* ===== POPUP MODAL ===== */}
      {popup.show && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div
            className={`w-[300px] p-5 rounded-xl shadow-xl text-center
              ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-400 text-black"}
            `}
          >
            <p className="font-bold mb-4">{popup.message}</p>

            <button
              onClick={() => setPopup({ show: false, message: "" })}
              className="bg-green-500 text-black px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ===== LOGIN CARD ===== */}
      <div
        className={`w-[380px] shadow-lg rounded-xl p-6
          ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-400 text-black"}
        `}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="relative mb-5">
          <FaEnvelope
            className={`absolute left-3 top-3 text-xl
              ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
              ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock
            className={`absolute left-3 top-3 text-xl
              ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
              ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full font-bold cursor-pointer py-2 rounded-md mb-4
            ${darkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-green-600 hover:bg-green-700 text-black"}
          `}
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`font-bold
              ${darkMode ? "text-white" : "text-black underline"}
            `}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

