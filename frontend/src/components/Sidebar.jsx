import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5 flex flex-col">
      {/* Logo */}
      <h2 className="text-2xl font-bold mb-5 text-center">EventManager</h2>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li>
          <Link 
            to="/dashboard" 
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/events" 
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Events
          </Link>
        </li>
        <li>
          <Link 
            to="/profile" 
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Profile
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button 
        onClick={logout} 
        className="mt-auto py-2 px-4 bg-red-500 hover:bg-red-600 rounded transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
