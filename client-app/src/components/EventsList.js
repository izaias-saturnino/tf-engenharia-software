import React, { useState } from "react";

const EventsList = (props) => {
    var events = props.events;
    var results = [];
    for(var event in events){
        results.push(
            <div className="py-3 w-100">
                <EventCard title={''} content=
                    {
                        "Localização: " + event.location + "\n" +
                        "Público: " + event.public + "\n" +
                        "Data: " + event.data
                    }
                />
            </div>
        );
    }
    if(results.length === 0){
        results.push(
            <div className="py-3 w-100">
                <EventCard title={''} content={'Ainda não há eventos.'}/>
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