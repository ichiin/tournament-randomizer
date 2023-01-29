import { Button } from 'components';
import { TournamentType } from 'types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TournamentsProps {
  tournaments: TournamentType[];
}

const Tournaments = ({ tournaments }: TournamentsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {tournaments.length > 0 &&
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
