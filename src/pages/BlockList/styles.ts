import { styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const BlueText = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const StyledImage = styled("img")`
  margin-right: 8px;
`;

export const PriceWrapper = styled(BlueText)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: "95vw !important",
  paddingTop: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0 40px",
    "& > div:nth-of-type(1)": {
      "& > div:nth-of-type(1)": {
        padding: "0 16px"
      },
      "& > div:nth-of-type(2)": {
        "& > div:nth-of-type(2)": {
          marginTop: "0px"
        }
      }
    },
    "& > div > div:nth-of-type(2)": {
      margin: "0 16px"
    },
    "& > div > div:nth-of-type(3)": {
      padding: "0 16px"
    },
    marginTop: "0px !important"
  }
}));
