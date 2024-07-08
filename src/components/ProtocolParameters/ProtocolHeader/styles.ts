import { styled, Box, Button } from "@mui/material";

export const Header = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  fontSize: "2.25rem",
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem"
  }
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: "0.875rem",
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  [theme.breakpoints.down("sm")]: {
    whiteSpace: "nowrap",
    padding: "10px 15px",
    fontSize: "0.75rem"
  }
}));

export const ContainerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
