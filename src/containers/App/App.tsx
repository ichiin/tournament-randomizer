import {
  GameResult,
  Group,
  GroupRandomizer,
  Home,
  Tournament,
  Tournaments,
} from 'containers';
import { RouterProvider } from 'react-router-dom';
import { colors } from 'utils/colors';
import { createBrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import useApp from './hooks/useApp';

const Container = styled.div`
  height: 100%;
  font-family: 'Lato', sans-serif;
  background-color: ${colors.darkJungleGreen};
  font-weight: 400;
`;

const App = () => {
  const { t } = useTranslation();
  const { setTournament, tournament, tournaments } = useApp();

  console.log(tournaments);

  const router = createBrowserRouter([
    {
      path: t('Home.path') || '/',
      element: <Home />,
    },
    {
      path: t('GroupRandomizer.path') || '/randomize',
      element: <GroupRandomizer />,
    },
    {
      path: t('Tournaments.path') || '/tournaments',
      element: <Tournaments tournaments={tournaments} />,
    },
    {
      path: t('Tournament.path') || '/tournament/:id',
      element: (
        <Tournament setTournament={setTournament} tournament={tournament} />
      ),
    },
    {
      path: t('Group.path') || '/tournament/:tid/group/:gid',
      element: <Group setTournament={setTournament} tournament={tournament} />,
    },
    {
      path:
        t('GameResult.path') || '/tournament/:tid/group/:gid/gameresult/:rid',
      element: <GameResult tournament={tournament} />,
    },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
