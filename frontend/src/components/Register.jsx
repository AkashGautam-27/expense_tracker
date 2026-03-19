import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register({ darkMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setMessage(data.message);

      setMessage("Registration Successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div
      className={`flex justify-center items-center  h-100dvh pt-15 pb-10
      ${darkMode ? "bg-gray-900" : "bg-gray-200"}
      `}
    >
      <div
        className={`w-[380px] shadow-lg rounded-xl p-6
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-400 text-black"}
        `}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {message && (
          <p
            className={`text-center mb-3 font-semibold
            ${darkMode ? "text-yellow-400" : "text-red-600"}
            `}
          >
            {message}
          </p>
        )}

        {/* Username */}
        <div className="relative mb-5">
          <FaUser
            className={`absolute left-3 top-3 text-xl
            ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
            ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <FaEnvelope
            className={`absolute left-3 top-3 text-xl
            ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
            ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <FaLock
            className={`absolute left-3 top-3 text-xl
            ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
            ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <FaLock
            className={`absolute left-3 top-3 text-xl
            ${darkMode ? "text-gray-300" : "text-black"}
            `}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full bg-transparent border-b-2 p-2 pl-10 outline-none
            ${darkMode ? "border-gray-500 text-white" : "border-black"}
            `}
          />
        </div>

        <button
          onClick={handleRegister}
          className={`w-full font-bold cursor-pointer py-2 rounded-md mb-4
          ${darkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-green-600 hover:bg-green-700 text-black"}
          `}
        >
          Register
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-bold
            ${darkMode ? "text-white" : "text-black underline"}
            `}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

