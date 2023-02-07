import { Button } from 'components';
import { TournamentType } from 'types';
import { getTournaments } from 'api/database'
import { useNavigate } from 'react-router-dom';
import {useQuery} from 'react-query';
import { useTranslation } from 'react-i18next';

interface TournamentsProps {
  tournaments: TournamentType[];
}

const Tournaments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: tournaments } = useQuery<TournamentType[]>('getTournaments', getTournaments);
  
  return (
    <>
      {tournaments && tournaments.length > 0 &&
        tournaments.map((tournament) => (
          <Button
            key={tournament.id}
            onClick={() =>
              navigate(t('Tournament.to', { tid: tournament.id }) || '')
            }
          >
            {tournament.name}
          </Button>
        ))}
    </>
  );
};

export default Tournaments;
