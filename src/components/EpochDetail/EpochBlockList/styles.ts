import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px 16px"
  },
  "& h2": {
    paddingLeft: "0px"
  }
}));

export const StyledColorBlueDard = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
`;

export const FakedLink = styled("span")`
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const StyledOutput = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
