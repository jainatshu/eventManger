import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className=" bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🎉 Event Manager</Link>
        </h1>

        {/* Navigation Links */}
        {user&&<div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          {/* <Link to="/events" className="hover:text-gray-200">Events</Link> */}
          <Link to="/create-event" className="hover:text-gray-200">Create Event</Link>
        </div>}

        {/* Auth Buttons */}
        <div>
          {user ? (
            <button 
              onClick={() => { logout(); navigate("/login"); }}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <><Link to="/login" className="mr-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Register
            </Link>
            </>
            
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button id="menu-btn" className="text-white text-3xl">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
