import { alpha, Box, styled } from "@mui/material";

import Table from "../../../commons/Table";

export const AssetName = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.6)};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.palette.primary[200]};
`;

export const Amount = styled(Box)`
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const TableMinting = styled(Table)(({ theme }) => ({
  "& td": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  "& th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  "& tr:last-child th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },
  "& > div:first-of-type": {
    margin: 0
  },
  "& tr th:last-child": {
    width: "120px"
  },
  [theme.breakpoints.down("sm")]: {
    "& tr th:last-child": {
      width: "unset"
    }
  }
}));
