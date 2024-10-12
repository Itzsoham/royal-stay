import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.8rem;
  overflow: auto;
`;

const Countainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <SideBar />
      <Main>
        <Countainer>
          <Outlet />
        </Countainer>
      </Main>
    </StyledApp>
  );
}

export default AppLayout;
