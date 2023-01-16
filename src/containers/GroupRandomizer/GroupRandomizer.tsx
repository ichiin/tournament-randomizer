import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Card } from 'components';
import useGroupRandomizer from './hooks/useGroupRandomizer';
import { GroupsBackground } from 'assets';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  height: 50px;
`;

const Container = styled.div`
  padding: 0px 24px;
  background-color: grey;
  background: url(${GroupsBackground});
  height: 100%;
`;

const PlayerListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
`;

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
    <Container>
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
          <PlayerListContainer>
            {playerList.map((player) => (
              <CardContainer>
                <Card title={player} />
              </CardContainer>
            ))}
          </PlayerListContainer>
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
    </Container>
  );
};

export default GroupRandomizer;
