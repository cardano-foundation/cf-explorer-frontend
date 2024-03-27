import { styled, Container, Box, MenuItem, Select } from "@mui/material";

export const StyledContainer = styled(Container)`
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-bottom: 20px;
  }
`;
export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.875rem",
  minHeight: 20
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1.125rem",
  minHeight: 20
}));

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  margin: "15px 0px 0px"
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: "var(--font-family-title)",
  border: `1px solid ${theme.palette.secondary[600]} !important`,
  background: "transparent",
  color: theme.palette.secondary[600],
  borderRadius: "8px",
  "& > div": {
    padding: "6px 12px",
    fontWeight: 500,
    fontSize: 12,
    cursor: "pointer",
    color: theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600]
  },
  "& > fieldset": {
    top: 0,
    border: "none !important"
  },
  "& > svg": {
    fill: theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600],
    fontSize: "20px"
  }
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary[600],
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary[200]
  },
  "&:hover": {
    backgroundColor: theme.palette.primary[200] + " !important"
  }
}));
