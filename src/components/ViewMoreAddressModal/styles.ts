import { ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material";

export const StyledListItem = styled(ListItem)`
  padding: 0px;
  display: flex;
  justify-content: flex-start;
`;

export const StyledListItemText = styled(Typography)`
  font-size: #108aef;
  font-size: 18px;
  font-weight: 700;
  color: #108aef;
  cursor: pointer;
`;

export const ModalTitle = styled(Typography)`
  font-weight: 700;
  font-size: 24px;
  color: #13152f;
`;
