import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/events`).then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div className=" p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
