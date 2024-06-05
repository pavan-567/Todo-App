import { Outlet } from "react-router-dom";
import Container from "../features/todo/styles/Container";
import Div from "../features/todo/styles/Div";
import { useEffect } from "react";

function AppLayout() {
  useEffect(function () {
    document.title = "Todo | React";
  }, []);

  return (
    <Div>
      <Container>
        <Outlet />
      </Container>
    </Div>
  );
}

export default AppLayout;
