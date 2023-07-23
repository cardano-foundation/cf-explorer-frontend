import { Box, styled, IconButton as IconButtonMui, Typography, alpha } from "@mui/material";

export const HoldBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.error[700]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
  "::after": {
    content: '"HOLD"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.error[700],
    transform: " translate(0, 60%)"
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.error[700]}`,
  borderRadius: "10px",
  background: theme.palette.common.white,
  marginRight: theme.spacing(1),
  position: "relative",
  "::after": {
    content: '"FEES"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.error[700],
    transform: " translate(0, 60%)"
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));
export const RewardWallet = styled(Box)(() => ({
  position: "absolute",
  left: "35%",
  top: "45%",
  display: "flex",
  alignItems: "center"
}));
export const RewardAccount = styled(Box)(() => ({
  position: "absolute",
  left: "38%",
  top: "40%",
  display: "flex",
  alignItems: "center"
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2)
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px"
}));

export const NetAmount = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.green[200]}`,
  borderRadius: "10px",
  position: "relative",
  background: theme.palette.common.white,
  "::after": {
    content: '"NET AMOUNT"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.green[200],
    transform: " translate(0, 60%)"
  }
}));

export const Withdrawn = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.green[200]}`,
  borderRadius: "10px",
  position: "relative",
  background: theme.palette.common.white,
  "::after": {
    content: '"WITHDRAWN"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.green[200],
    transform: " translate(0, 60%)"
  }
}));

export const RoundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "220px",
  padding: theme.spacing(3),
  borderRadius: "25px",
  width: "max-content"
}));

export const ADAAmountLabel = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.common.black};
  display: inline-block;
  margin-right: 8px;
`;

export const StepInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 36,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: 30
  }
}));

export const InfoGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  }
}));
