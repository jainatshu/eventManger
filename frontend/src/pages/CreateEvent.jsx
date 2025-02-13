import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.date) {
        alert("Please fill in all required fields");
        return;
    }
    try {
      await axios.post(`${API_BASE_URL}/events`, formData, { withCredentials: true });
      navigate("/dashboard");
    } catch {
      alert("Event creation failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateEvent;
