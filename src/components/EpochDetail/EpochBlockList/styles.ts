import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px 16px"
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: "10px"
  },
  "& h2": {
    paddingLeft: "0px"
  }
}));

export const BlueText = styled("span")`
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const EpochNo = styled("span")`
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const StyledOutput = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const PriceWrapper = styled(BlueText)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: -10
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  margin: "12px 0px"
}));
