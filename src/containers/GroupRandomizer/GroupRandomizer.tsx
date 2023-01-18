import { Button, List, NumberInput, TextInput } from 'components';
import { colors, typography } from 'utils/colors';

import Doughnut from 'components/Doughnut/Doughnut';
import styled from '@emotion/styled';
import useGroupRandomizer from './hooks/useGroupRandomizer';
import { useState } from 'react';
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
  flex-direction: row;
`;

const GeneratedList = styled.div`
  flex: 1;
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
  fontsize: ${typography.title.fontSize};
  fontweight: ${typography.title.fontWeight};
  margin-top: 24px;
  margin-bottom: 48px;
`;

const GroupRandomizer = () => {
  const { t } = useTranslation();
  const {
    addPlayersToList,
    generateGroups,
    playerList,
    playersGeneratedGroup,
    playerInput,
    groupSize,
    setPlayerInput,
    setGroupSize,
    toggleIsSeeded,
  } = useGroupRandomizer();
  const [numberOfGroups, setNumberOfGroups] = useState(0);

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
            label='Player list'
            items={playerList}
            toggleIsSeeded={toggleIsSeeded}
          />
        </SectionContainer>
        <ParameterSectionContainer>
          <DoughnutContainer>
            <Doughnut data={playerList} />
          </DoughnutContainer>
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
                number={numberOfGroups}
                setNumber={setNumberOfGroups}
              />
            </GenerationGroupNumberInputContainer>
            <Button onClick={generateGroups}>Generate</Button>
          </GenerationParameterContainer>
        </ParameterSectionContainer>
      </GenerationContentContainer>
      {playersGeneratedGroup.length > 0 && (
        <GeneratedListsContainer>
          {playersGeneratedGroup.map((group) => (
            <GeneratedList>
              <List label='Player list' items={group} />
            </GeneratedList>
          ))}
        </GeneratedListsContainer>
      )}
    </GroupRandomizerContainer>
  );
};

export default GroupRandomizer;
