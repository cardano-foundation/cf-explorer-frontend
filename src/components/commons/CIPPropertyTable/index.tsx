import { styled } from "@mui/material";

import Table from "../Table";

const CIPPropertyTable = styled(Table)(({ theme }) => ({
  marginBottom: "30px",
  "& .table-wrapper": {
    padding: 0,
    border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    borderBottom: "0px",
    boxShadow: theme.shadow.card
  },
  "& td, th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    paddingTop: "18px",
    paddingBottom: "18px"
  },

  "& tr th:nth-child(4), & tr td:nth-child(4)": {
    borderLeft: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },

  "& tr th:nth-child(4), & tr th:nth-child(5), & tr th:nth-child(6), & tr td:nth-child(4), & tr td:nth-child(5), & tr td:nth-child(6) ":
    {
      backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100]
    }
}));

export default CIPPropertyTable;
