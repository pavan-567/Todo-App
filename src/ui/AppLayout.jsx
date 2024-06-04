import { Outlet } from "react-router-dom";
import Div from "../features/todo/styles/Div";
import Container from "../features/todo/styles/Container";


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
