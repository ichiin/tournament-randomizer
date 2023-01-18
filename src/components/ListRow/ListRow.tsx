import Label from "components/Label";
import styled from "@emotion/styled";

const AvatarContainer = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  padding-right: 24px;
`;

const ListRowContainer = styled.li`
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
      <AvatarContainer>{avatar}</AvatarContainer>
      <NameContainer>
        <Label>{name}</Label>
      </NameContainer>
      <SeedContainer>{isSeeded ? "yes" : "no"}</SeedContainer>
    </ListRowContainer>
  );
};

export default ListRow;
