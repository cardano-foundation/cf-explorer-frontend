import { TabList } from "@mui/lab";
import { Box, Button, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary[600]
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
        background: theme.palette.grey[100]
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

export const TableSubTitle = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.75rem",
  fontWeight: "var(--font-weight-normal)"
}));

export const TableSubContent = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.75rem",
  fontWeight: "var(--font-weight-normal)"
}));

export const ButtonFilter = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.875rem",
  color: theme.palette.green[200],
  textTransform: "none",
  background: "rgba(67, 143, 104, 0.1)",
  borderRadius: 5,
  margin: "15px 0 15px 15px"
}));

export const TextResult = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.875rem"
}));

export const WrapWalletLabel = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: "0.875rem",
  fontWeight: 500
}));

export const TabHead = styled(Box)<{ active?: number }>(
  ({ active, theme }) => `
  color: ${active ? theme.palette.primary.main : theme.palette.secondary[600]} !important;
`
);

export const Headline = styled(Typography)<{ collapsed?: number }>`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: ${(props) => props.theme.palette.secondary.main};
  flex: 1;
  text-align: left;
  padding-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: min-content;
  display: ${({ collapsed }) => (collapsed ? "none" : "block")};
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: ${({ collapsed }) => (collapsed ? "block" : "none")};
  }
`;

export const WrapperDelegationTab = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center,
  margin-top: 12px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    gap: 10px;
  }
`;

export const AmountADARow = styled(Box)`
  font-size: 14px;
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  gap: 10px;
  align-items: center;
`;
