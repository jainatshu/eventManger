import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    };
    fetchEvents();

    socket.on("eventUpdated", (updatedEvent) => {
      setEvents((prev) =>
        prev.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  );
};
