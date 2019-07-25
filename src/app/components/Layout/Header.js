import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";

function Header() {
  return (
    <header className="Header">
      <nav className="Header--navigation">
        <NavLink
          exact
          to={ROUTES.defaultPage}
          className="Header--navigation-item"
        >
          Home
        </NavLink>
        <NavLink exact to={ROUTES.cart} className="Header--navigation-item">
          Cart
        </NavLink>
        <NavLink
          exact
          to={ROUTES.favourites}
          className="Header--navigation-item"
        >
          Favourites
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
