import React from "react";
import "./index.scss";
import { ROUTES } from "../../../constants";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="PageNotFound">
      <p>Oh no! Page not found: cha cha cha</p>
      <Link to={ROUTES.defaultPage}>Go Home: cha</Link>
    </div>
  );
}

export default PageNotFound;
