import {
    GameResult,
    Group,
    GroupRandomizer,
    Home,
    Tournament,
    Tournaments,
} from 'containers'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { colors } from 'utils/colors'
import styled from '@emotion/styled'
import useApp from './hooks/useApp'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
    background-color: ${colors.darkJungleGreen};
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    height: 100%;
`

const App = () => {
    const { t } = useTranslation()
    const { setTournament, tournament, tournaments } = useApp()

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
                <Tournament
                    setTournament={setTournament}
                    tournament={tournament}
                />
            ),
        },
        {
            path: t('Group.path') || '/tournament/:tid/group/:gid',
            element: (
                <Group
                    setTournament={setTournament}
                    tournament={tournament}
                />
            ),
        },
        {
            path:
                t('GameResult.path') ||
                '/tournament/:tid/group/:gid/gameresult/:rid',
            element: <GameResult tournament={tournament} />,
        },
    ])

    return (
        <Container>
            <RouterProvider router={router} />
        </Container>
    )
}

export default App
