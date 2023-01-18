import Label from "components/Label";
import { colors } from "utils/colors";
import styled from "@emotion/styled";

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
const SeedContainer = styled.div`
  color: white;
`;

interface ListRowProps {
  avatar: string;
  name: string;
  isSeeded: boolean;
}

const ListRow = ({ avatar, name, isSeeded }: ListRowProps) => {
  return (
    <ListRowContainer>
      <AvatarImage src={avatar} />
      <NameContainer>
        <Label>{name}</Label>
      </NameContainer>
      <SeedContainer>{isSeeded ? "yes" : "no"}</SeedContainer>
    </ListRowContainer>
  );
};

export default ListRow;
