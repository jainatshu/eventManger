import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    const event = new Event({ title, description, date, category, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Event creation failed" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventDetails = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id)
        .populate("createdBy", "name email")
        .populate("attendees", "name email");
  
      if (!event) return res.status(404).json({ error: "Event not found" });
  
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  };
  

// Register an attendee
export const registerAttendee = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.status(200).json({ message: "Successfully registered for event", attendees: event.attendees });

    // Emit real-time update
    req.io.to(eventId).emit("attendeeUpdate", event.attendees);
  } catch (error) {
    res.status(500).json({ error: "Failed to register attendee" });
  }
};
