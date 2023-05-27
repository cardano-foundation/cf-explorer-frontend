import { Box, Drawer, styled } from "@mui/material";

export const WrapTopSearch = styled(Drawer)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "unset"
  }
}));

export const MainContent = styled(Box)(({ theme }) => ({
  marginTop: 80,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  "& form": {
    boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.05)"
  }
}));
