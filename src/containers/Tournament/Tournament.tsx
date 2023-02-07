import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import useTournament from './hook/useTournament';
import { useTranslation } from 'react-i18next';

const Tournament = () => {
  const { t } = useTranslation();
  const { tournament } = useTournament();
  const navigate = useNavigate();

  return (
    <>
      {tournament && Object.keys(tournament).length > 0 && (
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
