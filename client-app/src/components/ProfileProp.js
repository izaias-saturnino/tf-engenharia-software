const ProfileProp = (props) => {

    if(props.propValue == undefined){
        return;
    }
    if(props.img != undefined){
        //TODO
        return (
            <div className="profile-properties">
                <div className="gray-text">{props.propName}</div>
                <div>
                    {props.propValue}
                </div>
            </div>
        )
    }

    return (
        <div className="profile-properties">
            <div className="gray-text">{props.propName}</div>
            <div>
                {props.propValue}
            </div>
        </div>
    )
}

export default ProfileProp;