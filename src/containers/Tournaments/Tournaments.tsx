import { Button } from 'components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TournamentType } from 'types';

interface TournamentsProps {
  tournaments: TournamentType[];
}

const Tournaments = ({ tournaments }: TournamentsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <Button
            key={tournament.id}
            onClick={() =>
              navigate(t('Tournament.to', { tid: tournament.id }) || '')
            }
          >
            {tournament.name}
          </Button>
        ))
      ) : (
        <p>No tournaments found</p>
      )}
    </>
  );
};

export default Tournaments;
