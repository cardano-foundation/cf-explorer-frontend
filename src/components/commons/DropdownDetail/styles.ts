import { alpha, Box, Button, styled } from "@mui/material";

export const InfoValue = styled(Box)(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: 14,
  padding: "15px 0",
  borderTop: `1px solid ${alpha(theme.palette.common.black, 0.05)}`,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12
  }
}));

export const ListDropdownContainer = styled(Box)`
  position: absolute;
  top: calc(100% + 1px);
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-height: 300px;
  background: ${(props) => props.theme.palette.background.paper};
  z-index: 1;
  box-shadow: ${(props) => props.theme.shadow.card};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ButtonClose = styled(Button)`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 0;
  min-width: 0;
  top: 10px;
  right: 10px;
`;

export const DropdownTitle = styled("h4")(({ theme }) => ({
  margin: 20,
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    marginRight: 50
  }
}));

export const DropdownList = styled("div")`
  margin: 20px;
  overflow-y: auto;
  max-height: 220px;
`;
