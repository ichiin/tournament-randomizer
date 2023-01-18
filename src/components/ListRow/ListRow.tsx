import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Label from 'components/Label';
import { colors } from 'utils/colors';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import styled from '@emotion/styled';

const AvatarImage = styled.img`
  border: 1px solid ${colors.dustyRed};
  border-radius: 50%;
  display: flex;
  height: 50px;
  justify-content: center;
  margin-right: 24px;
  width: 50px;
`;

const ListRowContainer = styled.li`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  padding: 12px 0px;
`;
const NameContainer = styled.div`
  flex: 1;
`;

const IconContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-align: center;
  padding: 12px;
`;

const IconsContainer = styled.div`
  color: white;
`;

interface ListRowProps {
  avatar: string;
  name: string;
  isSeeded: boolean;
  toggleIsSeeded?: Function;
}

const ListRow = ({ avatar, name, isSeeded, toggleIsSeeded }: ListRowProps) => {
  return (
    <ListRowContainer>
      <AvatarImage src={avatar} />
      <NameContainer>
        <Label>{name}</Label>
      </NameContainer>
      <IconsContainer>
        <IconContainer>
          <FontAwesomeIcon
            color={isSeeded ? colors.cornYellow : colors.lilyWhite}
            onClick={() => {
              if (toggleIsSeeded) {
                toggleIsSeeded({ avatarURL: avatar });
              }
            }}
            icon={isSeeded ? faStarSolid : faStarRegular}
            size='lg'
          />
        </IconContainer>
      </IconsContainer>
    </ListRowContainer>
  );
};

export default ListRow;
