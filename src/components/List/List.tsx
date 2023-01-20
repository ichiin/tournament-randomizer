import { Label, ListRow } from 'components';

import { PlayerType } from 'utils/types';
import { colors } from 'utils/colors';
import styled from '@emotion/styled';

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
  padding: 0 32px 0 0;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.37rem rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.lilyWhite};
    border-radius: 0.28rem;
    margin-left: 8px;
  }
`;

const LabelContainer = styled.div`
  margin-bottom: 8px;
`;

interface ListProps {
  deletePlayer?: Function;
  label: string;
  items: PlayerType[];
  toggleIsSeeded?: Function;
}

const List = ({ deletePlayer, label, items, toggleIsSeeded }: ListProps) => {
  return (
    <ListContainer>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
        </LabelContainer>
      )}
      {items.map((item) => {
        const { avatar, name, isSeeded } = item;
        return (
          <ListRow
            avatar={avatar}
            deletePlayer={deletePlayer}
            name={name}
            isSeeded={isSeeded}
            toggleIsSeeded={toggleIsSeeded}
          />
        );
      })}
    </ListContainer>
  );
};

export default List;
