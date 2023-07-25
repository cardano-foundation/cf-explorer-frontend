import { Box, Button, Typography, alpha, styled } from "@mui/material";

export const Step = styled(Box)<{ active: number }>(({ theme, active }) => ({
  width: "100%",
  padding: `0 0 ${theme.spacing(3)}`,
  borderBottom: `3px solid ${active ? theme.palette.green[600] : theme.palette.grey[200]}`,
  [theme.breakpoints.down("lg")]: {
    minWidth: "190px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px 30px"
  },
  cursor: "pointer"
}));

export const StepButton = styled(Box)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[600] : theme.palette.grey[200],
  ":hover": {
    background: active ? theme.palette.green[600] : theme.palette.grey[200]
  }
}));
export const TitleStep = styled(Box)<{ active: number }>(({ theme, active }) => ({
  color: active ? theme.palette.grey[700] : theme.palette.grey[300],
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1)
}));

export const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
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
  padding: "10px 20px",
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
  minWidth: 115,
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
  flexWrap: "wrap",
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
  ${({ theme }) => theme.breakpoints.down("sm")} {
    & > p:nth-of-type(1) {
      white-space: nowrap;
      width: min-content;
    }
  }
  ${({ theme }) => theme.breakpoints.down(365)} {
    & > p:nth-of-type(1) {
      white-space: break-spaces;
    }
  }
`;

export const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: "18px",
  lineHeight: "21px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    paddingTop: "0.5px"
  }
}));

export const ButtonText = styled(Typography)`
  font-weight: 700;
`;
export const StyledGroupButton = styled(Box)(({ theme }) => ({
  marginBottom: "40px",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "30px",
    borderTop: `1px solid ${alpha(theme.palette.grey[200], 1)}`
  }
}));
