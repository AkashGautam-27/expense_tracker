import { useState } from "react";
import { Link, useNavigate ,useLocation } from "react-router-dom";
import {
  FaInfoCircle, FaHome, FaPlus, FaEye, FaCog,
  FaBars, FaTimes,FaSun,FaMoon
} from "react-icons/fa";

export default function Header({ darkMode, setDarkMode }) {
  
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();

  // 🔥 check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // 🔥 Dynamic menu items
  const navItems = [
    // { path: "/about", label: "About", icon: <FaInfoCircle /> },

    ...(isLoggedIn
      ? [
          { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
          { path: "/add", label: "Add", icon: <FaPlus /> },
          { path: "/view", label: "View", icon: <FaEye /> },
          { path: "/setting", label: "Setting", icon: <FaCog /> },
        ]
      : [])
  ];

  // 🔥 logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/about");
    window.location.reload(); // refresh UI
  };

  return (
    <>
      <header  className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-md
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-400 text-black"}
        `}>

        {/* Logo */}
        <Link to="/about" className={`text-2xl font-bold uppercase hover:font-bold hover:scale-115 transition flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-800"}`}>
          Expense <span className={`${darkMode ? "text-green-600" : "text-green-900"}`}>Tracker</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                 
                   to={item.path}
                  className={`flex items-center gap-1 transition
                  ${
                    location.pathname === item.path
                      ? darkMode
                        ? "font-bold text-white scale-125"
                        : "font-bold text-black scale-125"
                      : darkMode
                        ? "text-gray-300 hover:font-bold hover:scale-125 hover:text-white"
                        : "hover:font-bold hover:scale-125"
                  }
                  `}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
         
<div className="hidden md:flex items-center gap-3">

  {/* 🌙 Dark Mode Toggle */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="text-xl cursor-pointer"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

  {/* Desktop – Login OR Logout */}
  {!isLoggedIn ? (
    <button
      className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}
              px-4 py-2 cursor-pointer rounded-md font-bold hidden md:block`}  
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  ) : (
    <button
      className="hidden md:block bg-red-400 text-black font-bold px-4 py-2 rounded-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  )}

</div>
 <div className="flex md:hidden items-center gap-3">

          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button onClick={() => setOpenMenu(true)} className="text-3xl">
            <FaBars />
          </button>
        </div>
     
             {openMenu && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div
            className={`w-64 h-full p-6
            ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-300 text-black"}
            `}
          >

            <button className="text-2xl mb-6" onClick={() => setOpenMenu(false)}>
              <FaTimes />
            </button>
              {/* Mobile Menu Items */}
              <ul className="flex flex-col gap-5 text-black text-lg">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setOpenMenu(false)}
                   
                         className={`flex items-center gap-1 transition
                  ${
                    location.pathname === item.path
                      ? darkMode
                        ? "font-bold text-white scale-110"
                        : "font-bold text-black scale-110"
                      : darkMode
                        ? "text-white "
                        : " "
                  }
                  `}
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Login/Logout */}
              {!isLoggedIn ? (
                <button
                  className="mt-6 bg-gray-200 text-black font-bold px-4 py-2 rounded-md"
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="mt-6 bg-red-400 text-black font-bold px-4 py-2  rounded-md"
                  onClick={() => {
                    setOpenMenu(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              )}

            </div>
          </div>
        )}
      </header>
    </>
  );
}


