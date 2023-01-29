import { colors, typography } from 'utils/colors';

import styled from '@emotion/styled';

const Container = styled.button`
  align-items: center;
  background-color: ${colors.dustyRed};
  border: none;
  border-radius: 12px;
  display: flex;
  color: ${colors.lilyWhite};
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: ${typography.button.fontSize};
  font-weight: ${typography.button.fontWeight};
  height: 100%;
  justify-content: center;
  outline: inherit;
  padding: 12px 24px;
  width: 100%;
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default Button;
