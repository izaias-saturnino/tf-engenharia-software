import React, { useState } from "react";
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

const EventsList = () => {
    var uri = backend_base_url+'/API/Events';
    var events = fetchContent(uri, '', 'POST');
    var results = [];
    for(var event in events){
        results.push(
            <div className="py-3 w-100">
                <EventCard key={event.id} title={event.title} content={event.content}/>
            </div>
        );
    }
    return (
    <div className="event-list-container py-5 px-2">
        {results}
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