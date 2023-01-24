import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import { TournamentType } from 'types';

interface TournamentsProps {
  tournaments: TournamentType[];
}

const Tournaments = ({ tournaments }: TournamentsProps) => {
  const navigate = useNavigate();
  return (
    <>
      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <Button
            key={tournament.id}
            onClick={() => navigate(`/tournament/${tournament.id}`)}
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
