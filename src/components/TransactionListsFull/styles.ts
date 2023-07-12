import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0 16px",
    "& h2": {
      paddingLeft: "0px"
    }
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: "10px"
  }
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;
export const Label = styled(Box)`
  min-width: 50px;
  color: ${({ theme }) => theme.palette.grey[300]};
`;

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));
