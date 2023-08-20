import React from "react";

const EventsList = (props) => {
    var events = props.events;
    var results = [];
    var key = 0;
    for(var event in events){
        results.push(
            <div key={key} className="py-3 w-100">
                <EventCard title={''} content=
                    {
                        "Localização: " + event.location + "\n" +
                        "Público: " + event.public + "\n" +
                        "Data: " + event.data
                    }
                />
            </div>
        );
        key++;
    }
    if(results.length === 0){
        results.push(
            <div key={key} className="py-3 w-100">
                <EventCard title={''} content={'Ainda não há eventos.'}/>
            </div>
        );
        key++;
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