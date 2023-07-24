import { Box, TableCell, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.palette.secondary.main} !important`
}));

export const ModalTitle = styled(Box)(() => ({
  fontSize: "var(--font-size-title)",
  fontWeight: 700,
  marginTop: "-24px",
  marginBottom: "30px"
}));

export const StyledTableCell: any = styled(TableCell)(() => ({
  borderColor: "transparent",
  paddingLeft: 0,
  paddingRight: 0
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  border: "transparent",
  background: theme.palette.background.paper,
  paddingLeft: 0,
  paddingRight: 0,
  fontWeight: "bold",
  color: theme.palette.secondary.light,
  top: "-1px"
}));
