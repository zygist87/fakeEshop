import React from "react";
//import "./index.scss";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components"; // sita paimportinau

const Main = styled.main`
  max-width: 1020px;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vw;
`;
function Layout({ children }) {
  return (
    <StyledLayout className="Layout">
      <Header />
      <Main className="Main">{children}</Main>
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
