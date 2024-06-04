import { Outlet } from "react-router-dom";
import Container from "../features/todo/styles/Container";
import Div from "../features/todo/styles/Div";

function AppLayout() {
  return (
    <Div>
      <Container>
        <Outlet />
      </Container>
    </Div>
  );
}

export default AppLayout;
