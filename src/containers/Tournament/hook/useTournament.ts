import { TournamentType } from 'types'
import { getTournament } from 'api/database'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'

const useTournament = () => {
    const { pathname } = useLocation()
    const tournamentId = Number.parseInt(
        pathname.split('/')[pathname.split('/').length - 1],
    )
    const { data: tournament } = useQuery<TournamentType>('getTournament', () =>
        getTournament({ id: tournamentId }),
    )

    return {
        tournament,
    }
}

export default useTournament
