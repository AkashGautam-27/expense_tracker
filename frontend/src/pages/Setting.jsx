import { useState, useEffect } from "react";
import { FaUserCircle, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Settings({ darkMode }) {
  const [logoutModal, setLogoutModal] = useState(false);
  const [popup, setPopup] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username") || "No Name Found",
      email: localStorage.getItem("email") || "No Email Found",
    });
  }, []);

  const showPopupMsg = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 2000);
  };

  const confirmLogout = () => {
    localStorage.clear();
    setLogoutModal(false);
    showPopupMsg("Logged out successfully!");
    setTimeout(() => navigate("/about"), 800);
  };

  return (
    <div
      className={` py-3 px-4
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}
      `}
    >
      <h1 className="text-3xl text-center font-semibold mb-10">
        Settings
      </h1>

      <div className="max-w-md mx-auto flex flex-col gap-10">

        {/* PROFILE */}
        <div
          className={`p-6 rounded-xl text-center shadow-lg transition-all hover:-translate-y-2
          ${darkMode ? "bg-gray-800" : "bg-gray-300"}
          `}
        >
          <div className="text-5xl mx-auto mb-3 flex justify-center">
            <FaUserCircle />
          </div>
          <h2 className="text-xl font-semibold">User Profile</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mt-2`}>
            Name: <strong>{user.username}</strong>
          </p>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Email: <strong>{user.email}</strong>
          </p>
        </div>
        {/* LOGOUT */}
        <div
          className={`p-6 rounded-xl text-center shadow-lg transition-all hover:-translate-y-2
          ${darkMode ? "bg-gray-800" : "bg-gray-300"}
          `}
        >
          <div className="text-5xl text-red-500 mx-auto mb-3 flex justify-center">
            <FaSignOutAlt />
          </div>
          <h2 className="text-xl font-semibold">Logout</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mt-2`}>
            End your current session securely.
          </p>
          <button
            onClick={() => setLogoutModal(true)}
            className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

    

      {/* LOGOUT MODAL */}
      {logoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-xl w-72
            ${darkMode ? "bg-gray-800 text-white" : "bg-gray-300"}
            `}
          >
            <h3 className="text-lg font-semibold  mb-4 text-center">
              Confirm Logout?
            </h3>
            <div className="flex justify-evenly">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP */}
      {popup && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
          {popup}
        </div>
      )}
    </div>
  );
}
