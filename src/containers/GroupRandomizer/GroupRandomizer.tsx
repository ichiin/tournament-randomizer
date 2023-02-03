import {
  Button,
  Doughnut,
  Group,
  List,
  NumberInput,
  TextInput,
} from 'components';
import { colors, typography } from 'utils/colors';

import styled from '@emotion/styled';
import useGroupRandomizer from './hooks/useGroupRandomizer';
import { useTranslation } from 'react-i18next';

const DoughnutContainer = styled.div`
  display: flex;
  margin-bottom: 80px;
  max-height: 300px;
  max-width: 300px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ParameterSectionContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const GeneratedListsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 100px;
`;

const GeneratedList = styled.div`
  flex: 1;
  justify-content: center;
  margin-bottom: 40px;
`;

const GenerationParameterContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const GenerationContentContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const GenerationGroupNumberInputContainer = styled.div`
  margin-bottom: 80px;
`;

const GroupRandomizerContainer = styled.div`
  padding: 0px 24px;
  background-color: ${colors.darkJungleGreen};
  height: 100%;
`;

const PlayerAddContainer = styled.div`
  align-items: flex-end;
  display: flex;
  margin-bottom: 40px;
`;

const PlayerAddInputButtonContainer = styled.div`
  height: 60px;
  max-width: 100px;
  width: 100%;
`;

const PlayerAddTextInputContainer = styled.div`
  flex: 1;
  margin-right: 32px;
`;

const Title = styled.h1`
  color: ${colors.lilyWhite};
  font-size: ${typography.title.fontSize};
  font-weight: ${typography.title.fontWeight};
  margin: 0;
  padding-top: 48px;
  padding-bottom: 48px;
`;

const GroupRandomizer = () => {
  const { t } = useTranslation();
  const {
    addPlayersToList,
    deletePlayer,
    generateGroups,
    playerList,
    playersGeneratedGroup,
    playerInput,
    groupSize,
    seededPlayersPerGroup,
    setPlayerInput,
    setGroupSize,
    setSeededPlayersPerGroup,
    toggleIsSeeded,
  } = useGroupRandomizer();

  console.log(playerList);

  return (
    <GroupRandomizerContainer>
      <Title>{t('GroupRandomizer.title')}</Title>
      <GenerationContentContainer>
        <SectionContainer>
          <PlayerAddContainer>
            <PlayerAddTextInputContainer>
              <TextInput
                label={'Player Tag'}
                onChange={setPlayerInput}
                value={playerInput}
              />
            </PlayerAddTextInputContainer>
            <PlayerAddInputButtonContainer>
              <Button onClick={addPlayersToList}>Add</Button>
            </PlayerAddInputButtonContainer>
          </PlayerAddContainer>
          <List
            deletePlayer={deletePlayer}
            label='Player list'
            items={playerList}
            toggleIsSeeded={toggleIsSeeded}
          />
        </SectionContainer>
        <ParameterSectionContainer>
        {/*
          <DoughnutContainer>
            <Doughnut data={playerList} />
  </DoughnutContainer>*/}
          <GenerationParameterContainer>
            <GenerationGroupNumberInputContainer>
              <NumberInput
                label={'Group size'}
                max={playerList.length}
                number={groupSize}
                setNumber={setGroupSize}
              />
            </GenerationGroupNumberInputContainer>
            <GenerationGroupNumberInputContainer>
              <NumberInput
                label={'Seeded players per group'}
                max={playerList.length}
                number={seededPlayersPerGroup}
                setNumber={setSeededPlayersPerGroup}
              />
            </GenerationGroupNumberInputContainer>
            <Button onClick={generateGroups}>Generate</Button>
          </GenerationParameterContainer>
        </ParameterSectionContainer>
      </GenerationContentContainer>
      {playersGeneratedGroup.length > 0 && (
        <GeneratedListsContainer>
          {playersGeneratedGroup.map((group, index) => (
            <GeneratedList>
              <Group
                label={`Lobby ${String.fromCharCode(97 + index).toUpperCase()}`}
                items={group}
              />
            </GeneratedList>
          ))}
        </GeneratedListsContainer>
      )}
    </GroupRandomizerContainer>
  );
};

export default GroupRandomizer;
