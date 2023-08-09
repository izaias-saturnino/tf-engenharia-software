import React, { useState } from "react";
import burgerIcon from "../images/burgerIcon.png"
import homeIcon from "../images/homeIcon.png"
import { useNavigate, useLocation, Link } from 'react-router-dom';

const UpperMenu = () => {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        console.log(searchTerm);
    }

    return (
        <div className="upper-menu-bar">
            <Link to="/home">
                <button className="home-button">
                    <img src={homeIcon} alt="Menu" />
                </button>
            </Link>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Busque por uma cozinha"
                />
            </form>
            <div className="burger-menu-container">
                <button className="burger-menu-button" onClick={toggleBurgerMenu}>
                    <img src={burgerIcon} alt="Menu" />
                </button>
                {isBurgerMenuOpen && (
                    <div className="burger-menu-dropdown">
                        <Link to="/profile">
                            <button className="burger-dropdown-menu-button">Credenciais</button>
                        </Link>
                        <button className="burger-dropdown-menu-button">Doações</button>
                        <button className="burger-dropdown-menu-button">Requisições</button>
                        <button className="burger-dropdown-menu-button">Eventos</button>
                        <Link to="/login">
                            <button className="burger-dropdown-menu-button">Sair</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpperMenu;