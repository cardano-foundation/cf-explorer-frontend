import { Box, Button, IconButton, Typography, alpha, styled } from "@mui/material";

export const Step = styled(Box)<{ active: number }>(({ theme, active }) => ({
  width: "100%",
  padding: `0 0 ${theme.spacing(3)}`,
  borderBottom: `3px solid ${active ? theme.palette.green[600] : theme.palette.grey[200]}`,
  [theme.breakpoints.down("sm")]: {
    padding: "16px 30px"
  }
}));

export const StepButton = styled(IconButton)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[600] : theme.palette.grey[200],
  ":hover": {
    background: active ? theme.palette.green[600] : theme.palette.grey[200]
  }
}));
export const TitleStep = styled(Box)<{ currentstep: number; index: number }>(({ theme, currentstep, index }) => ({
  color:
    currentstep === index
      ? theme.palette.grey[700]
      : currentstep > index
      ? theme.palette.grey[400]
      : theme.palette.grey[300],
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    whiteSpace: "nowrap"
  }
}));

export const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
  position: "unset",
  right: 20,
  bottom: 30,
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.8)
  }
}));
export const PreviousButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[500],
  background: "transparent",
  textTransform: "capitalize",
  fontWeight: "bold",
  borderRadius: "8px",
  position: "unset",
  padding: "10px 20px",
  left: 20,
  bottom: 30,
  border: `2px solid ${theme.palette.border.hint}`,
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.1)
  }
}));

export const ADATransfersButton = styled(Button)(({ theme }) => ({
  background: theme.palette.green[600],
  color: theme.palette.common.white,
  borderRadius: "8px",
  textTransform: "capitalize",
  fontWeight: "bold",
  ":hover": {
    background: alpha(theme.palette.green[600], 0.8)
  },
  fontSize: "12px"
}));

export const TabTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.common.black,
  textAlign: "left"
}));

export const StepHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 40,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    marginTop: 30,
    marginBottom: 15
  }
}));

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

export const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: "18px",
  lineHeight: "21px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px"
  }
}));

export const ButtonText = styled(Typography)`
  font-weight: 700;
`;
