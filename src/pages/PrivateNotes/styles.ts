import { alpha, Box, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import Table from "src/components/commons/Table";

export const Container = styled(Box)``;

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  fontFamily: "var(--font-family-title)",
  fontSize: "var(--font-size-text-x-large)",
  fontWeight: "var(--font-weight-bold)",
  paddingBottom: "8px",
  borderBottom: `1px solid ${alpha(theme.palette.green[800], 0.1)}`,
  [theme.breakpoints.down("sm")]: {
    alignItems: "center"
  }
}));

export const Title = styled("span")(({ theme }) => ({
  lineHeight: 1,
  color: theme.palette.common.black,
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px"
  },
  "@media (max-width: 355px)": {
    fontSize: "12px"
  }
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "0 20px",
  textTransform: "unset",
  alignItems: "center",
  height: "32px",
  borderRadius: "6px",
  fontWeight: "var(--font-weight-bold)",
  fontFamily: "var(--font-family-title)",
  "&:hover": {
    backgroundColor: theme.palette.primary.main
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    height: "28px",
    lineHeight: "28px"
  }
}));
// & .empty-content-table {
//   top: unset;
// }
// thead tr th {
//   font-size: var(--font-size-text-x-small);
//   padding: 10px 20px;
// }
// tbody tr {
//   padding: 0;
//   height: 60px;
// }
// tbody tr td {
//   padding: 0 20px;
// }
export const StyledTable = styled(Table)(({ theme }) => ({
  "& .empty-content-table": {
    top: "unset"
  },
  "& thead tr th": {
    fontSize: "var(--font-size-text-x-small)",
    padding: "10px 20px"
  },
  "& tbody tr": {
    padding: 0,
    height: "60px"
  },
  "& tbody tr td": {
    padding: "0 20px"
  },
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      border: "none"
    }
  }
}));

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
