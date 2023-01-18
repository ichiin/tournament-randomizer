import { Label, ListRow } from 'components';

import { PlayerType } from 'utils/types';
import styled from '@emotion/styled';

const LabelContainer = styled.div`
  margin-bottom: 8px;
`;

const ListCell = styled.div`
  width: 300px;
`;

const GroupContainer = styled.div``;

const GroupPlayersContainer = styled.div`
  column-gap: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface GroupProps {
  label: string;
  items: PlayerType[];
}

const Group = ({ label, items }: GroupProps) => {
  return (
    <GroupContainer>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
        </LabelContainer>
      )}
      <GroupPlayersContainer>
        {items.map((item) => {
          const { avatar, name, isSeeded } = item;
          return (
            <ListCell>
              <ListRow avatar={avatar} name={name} isSeeded={isSeeded} />;
            </ListCell>
          );
        })}
      </GroupPlayersContainer>
    </GroupContainer>
  );
};

export default Group;
