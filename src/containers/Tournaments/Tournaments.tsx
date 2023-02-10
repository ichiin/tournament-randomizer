import { Button } from 'components'
import { TournamentType } from 'types'
import { useNavigate } from 'react-router-dom'
import useTournaments from './hooks/useTournaments'
import { useTranslation } from 'react-i18next'

interface TournamentsProps {
    tournaments: TournamentType[]
}

const Tournaments = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { tournaments } = useTournaments()

    return (
        <>
            {tournaments &&
                tournaments.length > 0 &&
                tournaments.map((tournament) => (
                    <Button
                        key={tournament.id}
                        onClick={() =>
                            navigate(
                                t('Tournament.to', { tid: tournament.id }) ||
                                    '',
                            )
                        }
                    >
                        {tournament.name}
                    </Button>
                ))}
        </>
    )
}

export default Tournaments
