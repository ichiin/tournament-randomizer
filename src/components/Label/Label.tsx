import { colors, typography } from "utils/colors";

import styled from "@emotion/styled";

const LabelContainer = styled.label`
  color: ${colors.lilyWhite};
  font-size: ${typography.label.fontSize};
  font-weight: ${typography.label.fontWeight};
`;

const Label = ({ children }: { children: string }) => {
  return <LabelContainer>{children}</LabelContainer>;
};

export default Label;
