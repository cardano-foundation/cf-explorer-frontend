import { Box, styled, Tab } from "@mui/material";

export const TabTitle = styled("h3")`
  margin: 0px;
  color: ${({ theme }) => theme.palette.text.hint};
  text-align: left;
  text-transform: capitalize !important;

  &.active {
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const WrapTab = styled(Tab)`
  max-width: unset;
  padding: 12px 0;
  margin-right: 30px;
`;

export const TabLabel = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    lineHeight: "16px"
  }
}));

export const Header = styled(Box)(({ theme }) => ({
  paddingBottom: "8px",
  borderBottom: `1px solid ${theme.palette.primary[200]}`,
}));

export const Divider = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-35%",
  width: "100%",
  height: 0,
  borderBottom: `3px solid ${theme.palette.primary.main}`,
}));

export const WrapTitle = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "max-content"
}));

export const Title = styled("span")(({ theme }) => ({
  lineHeight: 1,
  color: theme.palette.primary.main,
  fontFamily: "var(--font-family-title)",
  fontSize: "var(--font-size-text-x-large)",
  fontWeight: "var(--font-weight-bold)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px"
  },
  "@media (max-width: 355px)": {
    fontSize: "12px"
  }
}));
