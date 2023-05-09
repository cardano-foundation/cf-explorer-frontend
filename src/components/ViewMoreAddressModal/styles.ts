import { ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material";

export const StyledListItem = styled(ListItem)`
  padding: 0px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 6px 0px;
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
