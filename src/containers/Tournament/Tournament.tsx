import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'components';
import { TournamentType } from 'types';
import { getTournament } from 'api/database';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TournamentProps {
  setTournament: Function;
  tournament: TournamentType;
}

const Tournament = ({ setTournament, tournament }: TournamentProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      const splitPath = pathname.split('/');
      // Last element of the URL is the tournament id
      const tournamentId = Number.parseInt(splitPath[splitPath.length - 1]);
      const tournament = await getTournament({ id: tournamentId });
      setTournament(tournament);
    };
    fetchTournament();
  }, [pathname, setTournament]);

  return (
    <>
      {Object.keys(tournament).length > 0 && (
        <div>
          <h1>{tournament.name}</h1>
          {tournament.groups &&
            tournament.groups.length > 0 &&
            tournament.groups.map((group) => (
              <Button
                key={group.id}
                onClick={() =>
                  navigate(
                    t('Group.to', { tid: tournament.id, gid: group.id }) || ''
                  )
                }
              >
                {group.name}
              </Button>
            ))}
        </div>
      )}
    </>
  );
};

export default Tournament;
