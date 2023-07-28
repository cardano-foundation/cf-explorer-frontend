import { TabList } from "@mui/lab";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const TitleTab = styled(Box)<{ active?: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const LabelStatus = styled(Box)(({ theme }) => ({
  textTransform: "uppercase",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontFamily: '"Roboto", sans-serif',
  fontWeight: "bold",
  fontSize: "0.875rem",
  borderRadius: 4,
  height: "60%",
  width: "max-content"
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main}!important;
`;

export const StyledTabList = styled(TabList)(({ theme }) => ({
  "& > div:nth-of-type(3)": {
    "&::-webkit-scrollbar": {
      height: "3px"
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent"
    },
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.secondary.light
      },
      "&::-webkit-scrollbar-track": {
        background: theme.palette.primary[100]
      }
    }
  },
  [theme.breakpoints.down("md")]: {
    "& > div:nth-of-type(3)": {
      "&::-webkit-scrollbar": {
        height: "0px"
      }
    }
  },
  "& > div > div": {
    justifyContent: "flex-start"
  },
  ".MuiTabScrollButton-root": {
    display: "none"
  }
}));

export const WrapperTabList = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary[200]}`
}));
