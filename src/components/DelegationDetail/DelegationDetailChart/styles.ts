import { alpha, Box, Grid, styled } from "@mui/material";

export const StyledContainer = styled(Box)`
  text-align: left;
`;

export const GridWrapper = styled(Grid)`
  min-height: 400px;
  padding: 0 0 0 0;
  text-align: left;
`;

export const Tab = styled("div")`
  display: inline-block;
`;

export const Button = styled("button")<{ active: number }>`
  width: 115px;
  border: none;
  border-radius: 5px;
  padding: 6px 0;
  font-weight: var(--font-weight-bold);
  color: ${({ theme, active }) => (active ? theme.palette.primary.contrastText : theme.palette.grey[400])};
  background-color: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.background.neutral)};
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: 16px;
  line-height: 24px;
`;

export const ChartContainer = styled("div")`
  padding-top: 20px;
`;

export const GridRight = styled(Grid)<{ space: number }>(({ theme, space }) => ({
  flex: 1,
  maxHeight: `calc(100% - ${space}px)`,
  background: theme.palette.text.secondary,
  borderRadius: 12,
  boxShadow: theme.shadow.card,
  padding: "0px 20px",
  [theme.breakpoints.down("lg")]: {
    padding: "25px 0px",
    maxHeight: "unset"
  }
}));

export const Item = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "25px 0px",

  "&:first-of-type": {
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.06)}`
  },
  [theme.breakpoints.down("sm")]: {
    "&:first-of-type": {
      borderBottom: "none",
      borderRight: `1px solid ${alpha(theme.palette.common.white, 0.06)}`
    }
  }
}));

export const AnalyticsTitle = styled("h2")(({ theme }) => ({
  margin: "40px 0 15px",
  width: "max-content",
  [theme.breakpoints.down("sm")]: {
    margin: "30px 0 15px"
  }
}));
export const Title = styled("div")`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

export const Value = styled("div")(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontFamily: "var(--font-family-title)",
  fontSize: 32,
  lineHeight: "47px",
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12
  }
}));

export const Horizon = styled("div")`
  width: 100%;
  opacity: 0.07;
  border: 1px solid ${(props) => props.theme.palette.common.white};
`;
