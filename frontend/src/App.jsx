import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; // ✅ Add Navbar
import Sidebar from "./components/Sidebar"; // ✅ Add Sidebar
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar /> {/* ✅ Always visible */}
          {/* <div className="main-content"> */}
            {/* <Sidebar /> ✅ Always visible for logged-in users */}
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
              </Routes>
            </div>
          {/* </div> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
