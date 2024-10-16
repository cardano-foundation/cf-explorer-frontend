import { Box, Card, styled, Typography } from "@mui/material";

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  background: theme.palette.secondary[0],
  paddingLeft: 30,
  borderRadius: 10,
  marginBottom: 35,
  marginTop: 25,
  height: 58,
  border: `1.5px solid ${theme.palette.primary[200]}`,
  "&:focus-within": {
    borderColor: theme.palette.secondary.light
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

export const Title = styled(Typography)`
  position: relative;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.isDark ? "#FFFFFF" : "#000000")};
  font-weight: 500 !important;
`;

export const Tabs = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "auto",
  maxWidth: "300px",
  [theme.breakpoints.up("md")]: {
    textAlign: "end"
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between"
  },
  [theme.breakpoints.down("sm")]: {
    overflow: "auto",
    width: "100%"
  }
}));

export const Tab = styled("button")<{ active: number }>(({ theme, active }) => ({
  boxSizing: "border-box",
  width: "50px",
  height: "28px",
  cursor: "pointer",
  borderRadius: 5,
  border: active ? "none" : `2px solid ${theme.palette.primary[200]}`,
  color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.secondary.light : theme.palette.secondary[0],
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    border: `1.5px solid ${theme.palette.primary[200]}`,
    borderRadius: 5,
    height: 28,
    width: 70
  }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.isDark ? "#24262E" : "#F9F9F9",
  padding: "2rem",
  borderRadius: "48px",
  textAlign: "center",
  margin: "auto",
  marginTop: "2rem",
  boxShadow: "none"
}));

export const StyledTitle = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "left",
  marginTop: "22px",
  marginBottom: "20px"
}));

export const StyledBoxIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.isDark ? "#2E303B" : "#FFFFFF",
  borderRadius: "20%",
  padding: 1.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
  width: "56px",
  height: "56px"
}));
