import { Box, Button, styled } from "@mui/material";
import Table from "../../components/commons/Table";

export const Container = styled(Box)``;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-family-title);
  font-size: var(--font-size-text-x-large);
  font-weight: var(--font-weight-bold);
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(24, 76, 120, 0.1);
`;

export const Title = styled("span")``;

export const AddButton = styled(Button)`
  background-color: ${props => props.theme.colorGreenLight};
  color: #fff;
  padding: 0 20px;
  text-transform: unset;
  height: 32px;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  &:hover {
    background-color: ${props => props.theme.colorGreenLight};
  }
`;

export const StyledTable = styled(Table)`
  & .empty-content-table {
    top: unset;
  }
  thead tr th {
    padding: 10px 25px;
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
  background-color: ${props => (props.typeButton === "View" ? "rgba(67, 143, 104, 0.1)" : "rgba(221, 67, 67, 0.1)")};
  border-radius: 5px;
  border-width: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;
`;
