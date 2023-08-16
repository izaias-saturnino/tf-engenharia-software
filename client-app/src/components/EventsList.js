import React, { useState } from "react";

const events = [
    { title: "Event 1", content: "Event 1 description" },
    { title: "Event 2", content: "Event 2 description" },
    { title: "Event 3", content: "Event 3 description" },
    { title: "Event 4", content: "Event 4 description" },
    { title: "Event 5", content: "Event 5 description" },
    { title: "Event 6", content: "Event 6 description" },
    { title: "Event 7", content: "Event 7 description" },
    { title: "Event 8", content: "Event 8 description" },
    { title: "Event 9", content: "Event 9 description" },
    { title: "Event 10", content: "Event 10 description" },
]

const EventsList = () => {
    return (
    <div className="event-list-container py-5 px-2">
    {events.map((event, index) => (
        <div className="py-3 w-100">
            <EventCard key={index} title={event.title} content={event.content}/>
        </div>
    ))}
    </div>
    );
}

const EventCard = ({ title, content }) => {
    return (
        <div className="event-card-container w-100">
            <div className="event-card-title">{title}</div>
            <div className="event-card-content">{content}</div>
        </div>
    )
}

export default EventsList;