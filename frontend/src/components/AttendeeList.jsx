import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

const AttendeeList = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    socket.emit("joinEvent", eventId);

    socket.on("updateAttendees", (updatedAttendees) => {
      setAttendees(updatedAttendees);
    });

    return () => {
      socket.off("updateAttendees");
    };
  }, [eventId]);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold">Attendees</h3>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
