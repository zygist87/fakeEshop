import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <nav className="Header--navigation">
        <NavLink to="/" className="Header--navigation-item">
          Home
        </NavLink>
        <NavLink to="/cart" className="Header--navigation-item">
          Cart
        </NavLink>
        <NavLink to="/favourites" className="Header--navigation-item">
          Favourites
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
