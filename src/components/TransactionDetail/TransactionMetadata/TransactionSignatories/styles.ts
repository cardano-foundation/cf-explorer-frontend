import { Box, styled } from "@mui/material";

import Table from "../../../commons/Table";

export const TableProtocol = styled(Table)({
  "& > div:first-of-type": {
    margin: 0
  },

  "& tr th:last-child": {
    width: "90%"
  }
});

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
