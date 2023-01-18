import { GroupRandomizer, Home } from "containers";

import { RouterProvider } from "react-router-dom";
import { colors } from "utils/colors";
import { createBrowserRouter } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  min-height: 100vh;
  font-family: "Lato", sans-serif;
  background-color: ${colors.darkJungleGreen};
  font-weight: 400;
`;

const App = () => {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: t("Home.path") || "/",
      element: <Home />,
    },
    {
      path: t("GroupRandomizer.path") || "/groups",
      element: <GroupRandomizer />,
    },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
