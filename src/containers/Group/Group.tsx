import { useNavigate } from 'react-router-dom';
import { TournamentType } from 'types';
import { Button } from 'components';
import useGroup from './hook/useGroup';
import { useTranslation } from 'react-i18next';

interface GroupProps {
  tournament: TournamentType;
}
const Group = ({ tournament }: GroupProps) => {
  const { group } = useGroup({ tournament });
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {group ? (
        <div>
          <h1>{group.name}</h1>
          <br />
          <h2>Games</h2>
          {group.games.map((game) => (
            <Button
              key={game.id}
              onClick={() =>
                navigate(
                  t('GameResult.to', {
                    tid: tournament.id,
                    gid: group.id,
                    rid: game.id,
                  }) || ''
                )
              }
            >
              Game {game.id}
            </Button>
          ))}
        </div>
      ) : (
        <p>Error fetching group</p>
      )}
    </>
  );
};

export default Group;
