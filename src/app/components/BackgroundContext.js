import React, { useState } from "react";

const BackgroundContext = React.createContext("white");

function withBackgroundColor(Component) {
  function WrappedComponent(props) {
    return (
      <BackgroundContext.Consumer>
        {context => <Component {...props} {...context} />}
      </BackgroundContext.Consumer>
    );
  }
  return WrappedComponent;
}

function BackgroundColorProvider({ children }) {
  const [background, setBackground] = useState("red");
  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}
export default BackgroundContext;
export { withBackgroundColor, BackgroundColorProvider };
