import { Box } from "@mui/material";
import { styled } from "@mui/material";
import Table from "../../components/commons/Table";

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.text.hint,
}));
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
