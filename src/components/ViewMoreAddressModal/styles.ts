import { ListItem, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material";

export const StyledListItem = styled(ListItem)`
  padding: 0px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: ${({ theme }) => theme.spacing(2)} 0px;
  border-bottom: 1px solid ${alpha("#000", 0.05)};
  &:first-child {
    border-top: 1px solid ${alpha("#000", 0.05)};
  }
`;

export const StyledListItemText = styled(Typography)`
  font-size: #108aef;
  font-size: 18px;
  font-weight: 700;
  color: #108aef;
  cursor: pointer;
  overflow-wrap: anywhere;
`;

export const ModalTitle = styled(Typography)`
  font-weight: 700;
  font-size: 24px;
  color: #13152f;
`;
