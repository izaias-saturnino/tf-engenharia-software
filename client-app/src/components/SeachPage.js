import React from "react";
import UpperMenu from "../components/UpperMenu";

const SearchPage = (props) => {
    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="p-10">
                    <div className="login-form">
                        <div>
                            <div className="title">{props.title}</div>
                            {props.placeholder !== undefined && (
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