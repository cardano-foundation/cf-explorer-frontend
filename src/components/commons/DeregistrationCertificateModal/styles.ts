import { Box, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainerModal = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[300], 0.1),
  padding: 24,
  [theme.breakpoints.down("md")]: {
    padding: "15px !important"
  }
}));

export const StakeLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.blue[100]} !important;
  margin-right: 6px;
  ${({ theme }) => theme.breakpoints.down(theme.breakpoints.values.sm)} {
    overflow-wrap: break-word;
  }
`;
