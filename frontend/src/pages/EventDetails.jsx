import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AttendeeList from "../components/AttendeeList";
import { API_BASE_URL } from "../config";


const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/events/${id}`)
      .then((res) => res.json())
      .then(setEvent)
      .catch(() => setError("Failed to fetch event details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!event) return <p className="text-center mt-6">Event not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-6">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.date}</p>
      <p className="mt-3">{event.description}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Category: {event.category}</h3>
        <p>Created by: {event.createdBy.name}</p>
      </div>

      {user && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Attendees:</h3>
          <AttendeeList eventId={id} />
        </div>
      )}
    </div>
  );
};

export default EventDetails;
