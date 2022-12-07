import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink end className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                JSONPlaceholder
              </span>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/user">
                    Find en user
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                SWAPI
              </span>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/species">
                    Species
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/starships">
                    Starships
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/news">
                NewsAPI
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/hobby">
                Hobby
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/facts">
                Facts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/love">
                Love
              </NavLink>
            </li>


            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Weather
              </span>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/weather1"
                  >
                    Weather
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/weather2">
                    Weather2
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/weather3">
                    Weather3
                  </NavLink>
                </li>

              </ul>
            </li>

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Todos
                </span>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/todos"
                  >
                    Todos
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/todocreate">
                    Create Todo
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/admintodo">
                    Admin todos
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/todoedit">
                    todos edit
                  </NavLink>
                </li>

              </ul>

            </li>



            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Boardgames
                </span>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/boardgames"
                  >
                    Boardgames
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/boardgamesCreate">
                    Create Boardgame
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/boardgamesAdmin">
                    Admin Boardgame
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/boardgameEdit">
                    Edit Boardgame
                  </NavLink>
                </li>

              </ul>

            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
