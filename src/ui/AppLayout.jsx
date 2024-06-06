import { Outlet } from "react-router-dom";
import Div from "../features/todo/styles/Div";
import Container from "../features/todo/styles/Container";
import useFetchUser from "../hooks/useFetchUser";
import { useSelector } from "react-redux";

function AppLayout() {
  const loading = useFetchUser();
  return (
    <Div>
      <Container>
        {loading && <p>Loader....</p>}
        {!loading && <Outlet />}
      </Container>
    </Div>
  );
}

export default AppLayout;
