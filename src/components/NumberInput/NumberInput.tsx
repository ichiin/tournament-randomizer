import { colors, typography } from "utils/colors";

import { Label } from "components";
import styled from "@emotion/styled";

const LabelContainer = styled.div`
  margin-bottom: 24px;
`;

const NumberContainer = styled.div`
  color: ${colors.lilyWhite};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const NumberInputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const NumberText = styled.div`
  align-items: center;
  display: flex;
  font-size: ${typography.numbers.fontSize};
  font-weight: ${typography.numbers.fontWeight};
  height: 60px;
  justify-content: center;
  margin: 0px 32px;
`;

const OperationButton = styled.button`
  align-items: center;
  border: 1px solid ${colors.lilyWhite};
  border-radius: 12px;
  background: transparent;
  color: ${colors.lilyWhite};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  display: flex;
  font-size: ${typography.numbers.fontSize};
  font-weight: ${typography.numbers.fontWeight};
  height: 60px;
  justify-content: center;
  outline: none;
  width: 60px;
`;

interface NumberInputProps {
  label?: string;
  max: number;
  number: number;
  setNumber: Function;
}

const NumberInput = ({ label, max, number, setNumber }: NumberInputProps) => {
  return (
    <NumberInputContainer>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
        </LabelContainer>
      )}
      <NumberContainer>
        <OperationButton
          disabled={number === 0}
          onClick={() => setNumber(number - 1)}
        >
          -
        </OperationButton>
        <NumberText>{number}</NumberText>
        <OperationButton
          disabled={number === max}
          onClick={() => setNumber(number + 1)}
        >
          +
        </OperationButton>
      </NumberContainer>
    </NumberInputContainer>
  );
};

export default NumberInput;
