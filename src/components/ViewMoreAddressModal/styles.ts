import { ListItem, Typography, alpha, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)`
  padding: 0px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: ${({ theme }) => theme.spacing(2)} 0px;
  border-bottom: 1px solid ${({ theme }) => alpha(theme.palette.common.black, 0.05)};
  &:first-of-type {
    border-top: 1px solid ${({ theme }) => alpha(theme.palette.common.black, 0.05)};
  }
`;

export const StyledListItemText = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.blue[100]};
  cursor: pointer;
  overflow-wrap: anywhere;
`;

export const ModalTitle = styled(Typography)`
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.palette.grey[400]};
`;
