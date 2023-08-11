import { Box, Button, styled, Tab } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Table from "src/components/commons/Table";

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  paddingLeft: 0,
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));
export const StyledTable = styled(Table)(({ theme }) => ({
  "& .empty-content-table": {
    top: "unset"
  },
  "& .table-wrapper": {
    minHeight: "75px"
  },
  "& .hide-scroll": {
    overflow: "hidden"
  },
  "thead tr th": {
    padding: "10px 25px",
    fontSize: "var(--font-size-text-x-small)"
  },
  "tbody tr": {
    padding: 0,
    height: "60px"
  },
  "tbody tr td": {
    padding: "0 25px"
  },
  ".MuiPagination-root.MuiPagination-text": {
    [theme.breakpoints.down("sm")]: {
      overflow: "hidden",
      width: "100% "
    }
  },
  ".no-record": {
    padding: "50px 0"
  }
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.secondary.light,
  fontWeight: "bold",
  marginRight: theme.spacing(2),
  padding: "6px 35px",
  border: `2px solid ${theme.palette.border.hint}`,
  ":hover": {
    border: `2px solid ${theme.palette.border.hint}`
  }
}));

export const DeleteButton = styled(LoadingButton)(({ theme }) => ({
  background: theme.palette.secondary.main,
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "8px 35px",
  color: theme.palette.common.white,
  ":hover": {
    background: theme.palette.secondary.main
  }
}));

export const WrapTab = styled(Tab)`
  max-width: unset;
  padding-left: 0;
  padding-right: 0;
  min-width: unset;
  margin-right: 30px;
`;
