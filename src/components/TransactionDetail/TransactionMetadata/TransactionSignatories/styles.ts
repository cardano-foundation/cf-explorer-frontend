import { Box, styled } from "@mui/material";

import Table from "../../../commons/Table";

export const TableProtocol = styled(Table)(({ theme }) => ({
  "& > div:first-of-type": {
    margin: 0
  },

  "& tr th:last-child": {
    width: "90%"
  },
  "& td": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  "& th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  "& tr:last-child th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  [theme.breakpoints.down("sm")]: {
    "& tr th:last-child": {
      width: "unset"
    }
  }
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  borderRadius: theme.spacing(2),
  overflow: "hidden"
}));

export const WrapperRowContent = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

export const WrapperSignerPublicKey = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8
}));
