import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.secondary[0]};
  padding: 25px;
  border: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  border-radius: ${({ theme }) => theme.spacing(2)};
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
  padding-bottom: 8px;
`;

export const StyledItem = styled(Box)`
  background-color: ${({ theme }) => theme.palette.secondary[0]};
  text-align: left;
  padding: 10px 0;
  font-size: var(--font-size-text);
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  &:last-child {
    border-bottom: none;
    padding: 10px 0 0;
  }
`;

export const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const StatusIcon = styled("img")`
  padding-right: 10px;
  width: 35px;
`;

export const AddressLink = styled(Link)`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  margin-right: 8px;
`;
