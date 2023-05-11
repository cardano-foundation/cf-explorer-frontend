import { Box, Button, IconButton, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Step = styled(Box)<{ active: number }>(({ theme, active }) => ({
  width: "100%",
  padding: `${theme.spacing(3)} 0`,
  borderBottom: `3px solid ${active ? theme.palette.green[600] : theme.palette.grey[200]}`,
}));

export const StepButton = styled(IconButton)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[600] : theme.palette.grey[200],
  ":hover": {
    background: active ? theme.palette.green[600] : theme.palette.grey[200],
  },
}));
export const TitleStep = styled(Box)<{ currentStep: number; index: number }>(({ theme, currentStep, index }) => ({
  color:
    currentStep === index
      ? theme.palette.grey[700]
      : currentStep > index
      ? theme.palette.grey[400]
      : theme.palette.grey[300],
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
}));

export const WrapTitle = styled(Box)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: theme.palette.common.black
}));

export const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
  textTransform: "capitalize",
  fontWeight: "bold",
  borderRadius: "8px",
  position: "unset",
  padding: "10px 20px",
  right: 20,
  bottom: 30,
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.8),
  },
  display: "flex",
  gap: 12,
  alignItems: "center"
}));
export const PreviousButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[500],
  background: "transparent",
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "8px 20px",
  position: "unset",
  borderRadius: "8px",
  left: 20,
  bottom: 30,
  border: `2px solid ${theme.palette.border.hint}`,
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.1),
  },
  display: "flex",
  alignItems: "center"
}));

export const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;