import React, { useState } from "react";
import burgerIcon from "../images/burgerIcon.png"
import homeIcon from "../images/homeIcon.png"
import { useNavigate, useLocation, Link } from 'react-router-dom';

const UpperMenu = (props) => {

    const state = { ...localStorage };

    const navigate = useNavigate();

    var userType = undefined;
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        console.log(searchTerm);
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
                    <div className="w-100">
                    {userType === "doador" && (
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Busque por uma cozinha"
                        />
                        <button type="submit" className="hidden form-btn"/>
                    </form>)}
                    </div>
                    <button className="d-flex burger-menu-button" onClick={toggleBurgerMenu}>
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

                                {userType === '"cozinha solidária"' && (
                                <Link to="/foodRequisition">
                                    <button className="burger-dropdown-menu-button">Requisições</button>
                                </Link>
                                )}

                                {userType === '"cozinha solidária"' && (
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
                                        <form onSubmit={logout}>
                                            <input type="submit" className="burger-dropdown-menu-button" value="Sair"/>
                                        </form>
                                    </Link>
                                )}

                                {userType === undefined && (
                                    <Link to="/login">
                                        <button className="burger-dropdown-menu-button">Entrar</button>
                                    </Link>
                                )}
                            </div>
                        )}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpperMenu;