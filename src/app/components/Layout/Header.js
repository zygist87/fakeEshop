import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <nav className="Header--navigation">
        <NavLink exact to="/" className="Header--navigation-item">
          Home
        </NavLink>
        <NavLink exact to="/cart" className="Header--navigation-item">
          Cart
        </NavLink>
        <NavLink exact to="/favourites" className="Header--navigation-item">
          Favourites
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
