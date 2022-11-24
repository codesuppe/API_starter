import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink end className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">JSONPlaceholder</span>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/user">Find en user</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">SWAPI</span>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/species">Species</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/starships">Starships</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/noget">Noget</NavLink>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar