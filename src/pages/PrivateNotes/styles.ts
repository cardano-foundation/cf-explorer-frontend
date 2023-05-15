import { alpha, Box, Button, styled } from "@mui/material";
import Table from "../../components/commons/Table";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export const Container = styled(Box)``;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-family: var(--font-family-title);
  font-size: var(--font-size-text-x-large);
  font-weight: var(--font-weight-bold);
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => alpha(props.theme.palette.green[800], 0.1)};
`;

export const Title = styled("span")`
  line-height: 1;
  color: ${(props) => props.theme.palette.common.black};
`;

export const AddButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding: 0 20px;
  text-transform: unset;
  height: 32px;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const StyledTable = styled(Table)`
  & .empty-content-table {
    top: unset;
  }
  thead tr th {
    font-size: var(--font-size-text-x-small);
    padding: 10px 20px;
  }
  tbody tr {
    padding: 0;
    height: 60px;
  }
  tbody tr td {
    padding: 0 20px;
  }
`;

export const ActionButton = styled("button")<{ typeButton: string }>`
  width: 30px;
  height: 30px;
  background-color: ${({ typeButton, theme }) =>
    typeButton === "View" ? theme.palette.success.light : alpha(theme.palette.red[700], 0.1)};
  border-radius: 5px;
  border-width: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.secondary.main} !important;
  font-weight: var(--font-weight-normal);
  &:hover {
    font-family: var(--font-family-text);
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const SmallText = styled("small")`
  display: block;
  white-space: nowrap;
  color: ${(props) => props.theme.palette.grey[500]};
  margin-top: 4px;
`;
export const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.grey[500],
  fontWeight: "bold",
  marginRight: theme.spacing(2),
  padding: "6px 35px",
  border: `2px solid ${theme.palette.border.hint}`,
  ":hover": {
    border: `2px solid ${theme.palette.border.hint}`
  }
}));

export const DeleteButton = styled(LoadingButton)(({ theme }) => ({
  background: theme.palette.grey[700],
  textTransform: "capitalize",
  padding: "8px 35px",
  fontWeight: "bold",
  color: theme.palette.common.white,
  ":hover": {
    background: theme.palette.grey[700]
  }
}));
