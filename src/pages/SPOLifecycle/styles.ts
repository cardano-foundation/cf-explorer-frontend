import { Button, alpha } from "@mui/material";
import { Box, Container, IconButton, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
  position: relative;
  min-height: calc(100vh - 170px);
`;
export const StakeId = styled("span")(({ theme }) => ({
  lineHeight: 1,
  fontWeight: "bold",
  color: theme.palette.blue[800],
  margin: `0 ${theme.spacing(1)} `,
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  background: "#E7E8EA",
  padding: "3px 2px",
  margin: `0 ${theme.spacing(2)}`,
  borderTopLeftRadius: "20px",
  borderBottomLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
}));
export const ButtonSwitch = styled(IconButton)<{ active: boolean }>(({ theme, active }) => ({
  margin: "0 2px",
  background: active ? theme.palette.green[600] : "transparent",
  ":hover": {
    background: active ? theme.palette.green[600] : theme.palette.green[600_10],
  },
}));

export const ButtonReport = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
  height: "44px",
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.8),
  },
}));
