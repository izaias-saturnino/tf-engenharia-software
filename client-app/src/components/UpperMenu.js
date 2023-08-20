import React, { useState } from "react";
import burgerIcon from "../images/burgerIcon.png"
import homeIcon from "../images/homeIcon.png"
import { useNavigate, Link } from 'react-router-dom';

const UpperMenu = (props) => {

    const navigate = useNavigate();
    const state = { ...localStorage };

    var userType = state.utype;
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        var { query } = document.getElementsByClassName("search-bar")[0];
        navigate("/account_search/"+query.value);
    }

    const logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="w-100 d-flex center-content box-shadow-small bg-white">
            <div className="screen-area">
                <div className="upper-menu-bar">
                    <Link to="/home" className="d-flex">
                        <img className="home-icon p-1" src={homeIcon} alt="Menu" />
                    </Link>
                    <div className="px-2 w-100">
                        <div className="px-2">
                            {userType === "doador" && (
                            <div className="px-2 border-gray">
                                <form className="search-bar" onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        name="query"
                                        placeholder={userType === "doador" ? "Busque por uma cozinha" : "Busque por uma conta"}
                                    />
                                    <button type="submit" className="hidden form-btn"/>
                                </form>
                            </div>)}
                        </div>
                    </div>
                    <div className="d-flex burger-menu-button" onClick={toggleBurgerMenu}>
                        <img className="burger-icon p-1" src={burgerIcon} alt="Menu" />
                        <div className="relative">
                        {isBurgerMenuOpen && (
                            <div className="burger-menu-dropdown">

                                {userType === "doador" && (
                                    <button className="burger-dropdown-menu-button">Perfil</button>)}

                                {userType !== undefined && (
                                    <Link to="/donation_history">
                                        <button className="burger-dropdown-menu-button">Doações</button>
                                    </Link>
                                )}

                                {userType === "cozinha solidária" && (
                                    <Link to="/foodRequisition">
                                        <button className="burger-dropdown-menu-button">Requisições</button>
                                    </Link>
                                )}

                                {userType === "cozinha solidária" && (
                                    <Link to="/createEvent">
                                        <button className="burger-dropdown-menu-button">Eventos</button>
                                    </Link>
                                )}

                                {userType === "doador" && (
                                    <Link to="/modify_profile">
                                        <button className="burger-dropdown-menu-button">Credenciais</button>
                                    </Link>
                                )}

                                {userType !== undefined && (
                                    <Link to="/login">
                                        <button className="burger-dropdown-menu-button">Sair</button>
                                    </Link>
                                )}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpperMenu;