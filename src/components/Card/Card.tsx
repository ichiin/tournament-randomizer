import styled from '@emotion/styled';

interface CardProps {
  avatar?: any;
  title: string;
}

const CardContainer = styled.div`
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 8px;
  font-family: 'Prompt', sans-serif;
  font-weight: 300;
  padding: 16px 12px;
  width: 150px;
`;

const Card = ({ avatar, title }: CardProps) => {
  return <CardContainer>{title}</CardContainer>;
};

export default Card;
