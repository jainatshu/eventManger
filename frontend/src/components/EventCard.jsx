import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <Link to={`/events/${event._id}`} className="text-blue-600 mt-2 block">View Details</Link>
    </div>
  );
};

export default EventCard;
