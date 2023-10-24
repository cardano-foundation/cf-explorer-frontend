import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.secondary[0]};
  padding: 15px;
  border: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  border-radius: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 15px 5px;
  }
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  padding-bottom: 8px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-right: 10px;
    padding-left: 10px;
  }
`;

export const StyledItem = styled(Box)`
  background-color: ${({ theme }) => theme.palette.secondary[0]};
  text-align: left;
  padding: 10px 0;
  font-size: var(--font-size-text);
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
`;

export const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    justifyContent: "center"
  }
}));

export const StatusIcon = styled("img")`
  padding-right: 10px;
  width: 35px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-right: 5px;
    margin-top: 20px;
  }
`;

export const AddressLink = styled(Link)`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  margin-right: 8px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-right: 0;
  }
`;

export const Amount = styled("span")`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${(props) => (props.theme.isDark ? props.theme.palette.success[700] : props.theme.palette.success[800])};
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

export const ContainerInfo = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "scroll",
  overflowY: "hidden",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));

export const AmountMobileContainer = styled(Box)(({ theme }) => ({
  minWidth: "max-content",
  maxWidth: "50%",
  [theme.breakpoints.down("sm")]: {
    margin: "10px 0"
  }
}));

export const AmountMobileTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  marginRight: theme.spacing(3),
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "inline-block"
  }
}));

export const EllipsisContainer = styled(Box)<{ isFailed?: boolean }>`
  font-weight: bold;
  color: ${({ theme, isFailed }) => (isFailed ? theme.palette.secondary[600] : theme.palette.primary.main)};
  max-width: 60vw;
  ${({ theme }) => theme.breakpoints.up(420)} {
    max-width: 62vw;
  }
  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 60vw;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 40vw;
  }
  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 55vw;
  }
`;

export const FromContainer = styled(Box)(() => ({
  minWidth: 120,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center"
}));

export const ToContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: theme.spacing(2),
  marginTop: "10px"
}));

export const AmountTextHeader = styled(Box)(({ theme }) => ({
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));
