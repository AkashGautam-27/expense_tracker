import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaQrcode,
  FaEnvelope,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";

export default function Footer({ darkMode }) {
  return (
    <footer
      className={`px-10 py-6 transition-all
      ${darkMode
        ? "bg-gray-900 text-gray-200"
        : "bg-gray-400 text-gray-800"}
      `}
    >

      {/* Main Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-5">

        {/* ABOUT */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Expense Tracker
          </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Making your financial life simple and smart — track, plan, and grow with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["dashboard","add","view","setting"].map(link => (
              <li key={link}>
                <Link
                  to={`/${link}`}
                  className={`block transition
                  ${darkMode
                    ? "hover:text-white hover:scale-98 hover:font-bold"
                    : "hover:font-bold hover:translate-x-1"}
                  `}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center space-x-5 text-3xl">
            {[FaFacebook, FaInstagram, FaWhatsapp, FaQrcode].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className={`transition
                ${darkMode
                  ? "hover:text-white hover:scale-125"
                  : "hover:scale-125"}
                `}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="mb-2 flex items-center gap-3">
            <FaEnvelope /> support@ExpenseTracker.com
          </p>
          <p className="mb-2 flex items-center gap-3">
            <FaPhone /> +91 00000 00000
          </p>
          <p className="mb-2 flex items-center gap-3">
            <FaBuilding /> Satna, India
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className={`text-center border-t pt-3
        ${darkMode ? "border-gray-700" : "border-black"}
      `}>
        <p className="text-sm">
          © 2025 Expense Tracker | Built with MERN
        </p>
      </div>
    </footer>
  );
}
