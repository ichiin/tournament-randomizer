import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useGroupRandomizer from './hooks/useGroupRandomizer';

const GroupRandomizer = () => {
  const { t } = useTranslation();
  const {
    addPlayersToList,
    generateGroups,
    playerList,
    playersGeneratedGroup,
    playerInput,
    playerNumberPerGroup,
    setPlayerInput,
    setPlayerNumberPerGroup,
  } = useGroupRandomizer();

  return (
    <>
      <h1>{t('GroupRandomizer.title')}</h1>
      <div>
        <TextField
          onChange={(event) => setPlayerInput(event.target.value)}
          multiline
          value={playerInput}
        />
        <Button onClick={addPlayersToList}>Add</Button>
      </div>
      {playerList.length > 0 && (
        <>
          <ul>
            {playerList.map((player) => (
              <li>{player}</li>
            ))}
          </ul>
          <div>{t('GroupRandomizer.parametersTitle')}</div>
          <TextField
            onChange={(event) =>
              setPlayerNumberPerGroup(Number.parseInt(event.target.value))
            }
            label={t('GroupRandomizer.parametersPlayerNumber')}
            value={playerNumberPerGroup}
          />
          <Button onClick={generateGroups}>Generate</Button>
        </>
      )}
      {playersGeneratedGroup.length > 0 &&
        playersGeneratedGroup.map((group, index) => {
          return (
            <>
              <div>Group {index + 1}</div>
              <ul>
                {group.map((player) => (
                  <li>{player}</li>
                ))}
              </ul>
            </>
          );
        })}
    </>
  );
};

export default GroupRandomizer;
