import { ButtonProps, Button as MuiButton, styled } from "@mui/material";
import { colors, typography } from "utils/colors";

const Button = styled(MuiButton)<ButtonProps>(() => ({
  backgroundColor: colors.dustyRed,
  color: colors.lilyWhite,
  fontFamily: `"Lato", sans-serif`,
  fontSize: typography.button.fontSize,
  fontWeight: typography.button.fontWeight,
  width: "100%",
}));

export default Button;
