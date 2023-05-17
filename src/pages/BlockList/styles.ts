import { styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledColorBlueDard = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const StyledImage = styled("img")`
  margin-right: 8px;
`;

export const PriceWrapper = styled(StyledColorBlueDard)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  [theme.breakpoints.down("sm")]: {
    "& > div:nth-of-type(1)": {
      "& > div:nth-of-type(1)": {
        padding: "0 16px"
      },
      "& > div:nth-of-type(2)": {
        padding: "0 16px"
      }
    },
    paddingTop: "0px"
  }
}));
