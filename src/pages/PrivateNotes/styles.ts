import { alpha, Box, Button, styled } from "@mui/material";
import Table from "../../components/commons/Table";

export const Container = styled(Box)``;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-family: var(--font-family-title);
  font-size: var(--font-size-text-x-large);
  font-weight: var(--font-weight-bold);
  padding-bottom: 8px;
  border-bottom: 1px solid ${props => alpha(props.theme.palette.green[800], 0.1)};
`;

export const Title = styled("span")`
  line-height: 1;
`;

export const AddButton = styled(Button)`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
  padding: 0 20px;
  text-transform: unset;
  height: 32px;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  &:hover {
    background-color: ${props => props.theme.palette.primary.main};
  }
`;

export const StyledTable = styled(Table)`
  & .empty-content-table {
    top: unset;
  }
  thead tr th {
    font-size: var(--font-size-text-x-small);
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

export const ButtonCancel = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: "#ffffff",
  background: theme.colorGreenLight,
  height: "32px",
  boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  ":hover": {
    background: theme.colorGreenLight,
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
}));
