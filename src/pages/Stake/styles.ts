import { styled, Container, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: "30px",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    paddingTop: "0px"
  },
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

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.grey[300]};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[300],
  display: "block",
  textAlign: "left",
  width: "max-content",
  lineHeight: 1,
  marginTop: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    width: "100%",
    textAlign: "left",
    marginTop: 15,
    top: "unset",
    right: "unset"
  }
}));
