import { MenuItem, styled, Box } from "@mui/material";

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.text.hint
}));

export const Title = styled("h2")(({ theme }) => ({
  display: "inline-block",
  width: "max-content",
  textAlign: "left",
  position: "relative",
  "&::after": {
    position: "absolute",
    content: `""`,
    left: 0,
    bottom: -2,
    width: "100%",
    height: 2,
    background: theme.palette.primary.main
  }
}));

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  padding: "6px 20px",
  textAlign: "center",
  height: "40px"
}));

export const DelegationData = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabSelect = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: 30,
  [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
    display: "none"
  }
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.secondary}`,
  display: "none",
  [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
    display: "block"
  }
}));
