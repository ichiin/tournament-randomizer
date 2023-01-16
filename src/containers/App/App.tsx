import styled from '@emotion/styled';
import { GroupRandomizer, Home } from 'containers';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
`;

const App = () => {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: t('Home.path') || '/',
      element: <Home />,
    },
    {
      path: t('GroupRandomizer.path') || '/groups',
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
