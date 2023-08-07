import { Tab, Tabs, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const ModalTitle = styled("div")(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: "var(--font-size-title)",
  color: theme.palette.text.primary,
  marginBottom: 30
}));

export const TextUserInfo = styled("span")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "var(--font-size-text)",
  color: theme.palette.secondary.main,
  margin: "0px 3px",
  display: "inline-block"
}));

export const TextTx = styled("span")`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const CustomTab = styled(Box)`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-transform: none;
  margin-left: 5px;
`;

export const TextAmountReward = styled("span")`
  margin-right: 5px;
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.secondary.light};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const Status = styled("span")<{ status: WalletActivityIF["status"] }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${({ status, theme }) =>
    status === "SUCCESS"
      ? theme.palette.success[700]
      : status === "FAIL"
      ? theme.palette.error[700]
      : theme.palette.warning[800]};
  background-color: ${({ status, theme }) =>
    status === "SUCCESS"
      ? theme.palette.success[100]
      : status === "FAIL"
      ? theme.palette.error[100]
      : theme.palette.warning[100]};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${({ theme }) => theme.palette.primary.main} !important;
  font-weight: var(--font-weight-normal);
  &:hover {
    font-family: var(--font-family-text);
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const StyledLinkKey = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

export const OverviewIcon = styled(Box)`
  border-radius: 49px;
  background: ${(props) => props.theme.palette.primary[200]};
  width: 29px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Amount = styled(Box)<{ type: "up" | "down" }>(({ type, theme }) => ({
  color: type === "up" ? theme.palette.success[800] : theme.palette.error[700],
  display: "flex",
  alignItems: "center",
  gap: 5,
  marginRight: "5px"
}));

export const StyledBoxTransaction = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    maxWidth: "195px"
  }
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  maxHeight: "70vh",
  "&::-webkit-scrollbar": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "80vh"
  }
}));
