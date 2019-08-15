import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0px 15px;
  background: #2e802e;

  .Header--navigation {
    max-width: 1020px;
    margin: 0 auto;

    &-item {
      color: #ffffff;
      font-size: 20px;
      line-height: 20px;
      padding: 20px 10px;
      display: inline-block;
      transition: opacity 0.3s;

      &:hover,
      &.active {
        opacity: 0.6;
        background: white;
        color: #2e802e;
      }
    }
  }
`;

function Header() {
  return (
    <StyledHeader className="Header">
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
    </StyledHeader>
  );
}

export default Header;
