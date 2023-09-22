import { Box, Button, Typography, alpha, styled } from "@mui/material";

export const Step = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: `0 0 ${theme.spacing(3)}`,
  borderBottomWidth: "3px",
  borderBottomStyle: "solid",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 0px"
  },
  cursor: "pointer"
}));

export const StepButton = styled(Box)<{ active: number }>(() => ({}));
export const TitleStep = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px"
  }
}));

export const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.secondary.main,
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
  ":hover": {
    background: theme.palette.secondary.main
  }
}));
export const PreviousButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.secondary.main} !important`,
  background: "transparent",
  textTransform: "capitalize",
  fontWeight: "bold",
  borderRadius: "8px",
  padding: "10px 20px",
  border: `2px solid ${theme.palette.primary[200]}`,
  ":hover": {
    background: "transparent"
  }
}));

export const ADATransfersButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary[0],
  borderRadius: "8px",
  textTransform: "capitalize",
  fontWeight: "bold",
  minWidth: 115,
  fontSize: "12px",
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.dark
  }
}));

export const TabTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.secondary.main,
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
  color: theme.palette.secondary.main,
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
