import { Outlet } from "react-router-dom";
import Div from "../features/todo/styles/Div";
import Container from "../features/todo/styles/Container";
import useFetchUser from "../hooks/useFetchUser";
import Spinner from "../features/todo/styles/Spinner";

function AppLayout() {
  const loading = useFetchUser();
  return (
    <Div>
      <Container>
        {loading && (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        )}
        {!loading && <Outlet />}
      </Container>
    </Div>
  );
}

export default AppLayout;
