import React from "react";
import "./index.scss";

function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <h1>Fake eshop</h1>
      </header>
      <main>{children}</main>
      <footer>
        <span role="img" aria-label="lol foot">
          labas
        </span>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
