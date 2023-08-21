import React from "react";
import UpperMenu from "../components/UpperMenu";

const SearchPage = (props) => {
    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="p-10">
                    {props.before_content !== undefined?
                    <div className="py-10">
                        {props.before_content}
                    </div>
                    :
                    <div></div>
                    }
                    <div className="login-form">
                        <div>
                            <div className="title">{props.title}</div>
                            {false && (
                                <div>
                                    <form className="main-form">
                                        <div className="input-container">
                                            <input placeholder={props.placeholder} type="text" name="search" />
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="search-results">
                                {props.results}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchPage;