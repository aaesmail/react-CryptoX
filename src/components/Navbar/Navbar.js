import React from "react";
import { NavLink } from "react-router-dom";

/*
 * Responsive Navbar that collapses
 */
const Navbar = (props) => {
  return (
    <div className="bg-dark nav-cover">
      <nav className="navbar navbar-dark navbar-expand-md bg-dark">
        <NavLink className="navbar-brand" to="/">
          CryptoX
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/coins"
              >
                Coins
              </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#collapsibleNavbar">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/exchanges"
              >
                Exchanges
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(Navbar);
