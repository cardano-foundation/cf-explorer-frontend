import { Box, styled } from "@mui/material";

import Table from "../../../commons/Table";

export const TableProtocol = styled(Table)({
  "& > div:first-of-type": {
    margin: 0
  },
  "& tr th:last-child": {
    width: "120px"
  }
});

export const UpdatedValue = styled(Box)(() => ({
  width: "100%",
  maxWidth: 300,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  padding: 0,
  textTransform: "none",
  display: "block"
}));
