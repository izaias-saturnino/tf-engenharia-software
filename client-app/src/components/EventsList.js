import React, { useEffect, useState } from "react";
import fetchContent from "../gets/Fetch";
import { backend_base_url } from "../App";

const updateResults = (setResults, events) =>{
    console.log(events);
    var results = [];
    var key = 0;

    for(var event in events){
        results.push(
            <div key={key} className="py-3 w-100">
                <EventCard title={undefined} content=
                    {
                        <div>
                            <div className="py-1">
                                Localização: {events[event].location}
                            </div>
                            <div  className="py-1">
                                Público: {events[event].public}
                            </div>
                            {/* <div className="py-1">
                                Data: {events[event].date}
                            </div> */}
                        </div>
                    }
                />
            </div>
        );
        key++;
    }
    if(results.length === 0){
        results.push(
            <div key={key} className="py-3 w-100">
                <EventCard title={undefined} content={
                    <div  className="py-1">
                        Ainda não há eventos.
                    </div>
                }/>
            </div>
        );
        key++;
    }
    setResults(results);
}

const EventsList = (props) => {
    const events = props.events;
    const [results, setResults] = useState([]);

    useEffect(()=>{
        fetchContent(backend_base_url+'/API/Event/GetAllEvents', 0, 'POST',
        (data)=>{
            updateResults(setResults, data);
            console.log(data);
        });
    }, [events]);

    return (
        <div className="event-list-container py-5 px-2">
            {results}
        </div>
    );
}

const EventCard = ({ title, content }) => {
    return (
        <div className="event-card-container w-100">
            {title !== undefined?
            <div className="event-card-title">{title}</div>
            :
            <div></div>
            }
            <div className="event-card-content">{content}</div>
        </div>
    )
}

export default EventsList;