import { Box, IconButton, styled } from "@mui/material";

export const InfoValue = styled(Box)(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: 14,
  padding: "15px 0",
  borderTop: `1px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary.main}`,
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
  background: ${(props) => props.theme.palette.secondary[0]};
  z-index: 1;
  box-shadow: ${(props) => props.theme.shadow.card};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    max-height: 350px;
  }
`;

export const ButtonClose = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  padding: 0,
  border: `1px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[600]}`,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    right: 15,
    zIndex: 10
  }
}));

export const DropdownTitle = styled("h4")(({ theme }) => ({
  margin: 20,
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    marginRight: 50
  }
}));

export const DropdownList = styled(Box)`
  margin: 20px;
  overflow: scroll;
  max-height: 250px;
`;
