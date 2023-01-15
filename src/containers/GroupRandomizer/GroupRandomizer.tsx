import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useGroupRandomizer from './hooks/useGroupRandomizer';

const GroupRandomizer = () => {
  const { t } = useTranslation();
  const { addPlayersToList, playerList, playerInput, setPlayerInput } =
    useGroupRandomizer();

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
        </>
      )}
    </>
  );
};

export default GroupRandomizer;
