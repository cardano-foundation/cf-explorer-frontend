import React from "react";
import StyledModal from "../commons/StyledModal";
import { List, ListItem, ListItemText } from "@mui/material";
import CopyButton from "../commons/CopyButton";
import { ModalTitle, StyledListItem, StyledListItemText } from "./styles";
import { formatHash } from "../../commons/utils/helper";

export interface ViewMoreAddressModalProps {
  title?: string;
  items?: string[];
  open: boolean;
  onClose?: () => void;
  onItemClick?: (item: string) => void;
}

const ViewMoreAddressModal: React.FC<ViewMoreAddressModalProps> = ({ title, items, open, onClose, onItemClick }) => {
  return (
    <StyledModal width={280} open={open} handleCloseModal={() => onClose?.()}>
      <>
        {title && <ModalTitle>{title}</ModalTitle>}
        <List>
          {items?.length &&
            items.map(text => (
              <StyledListItem>
                <StyledListItemText onClick={() => onItemClick?.(text)}>{formatHash(text)}</StyledListItemText>
                <CopyButton text={text} />
              </StyledListItem>
            ))}
        </List>
      </>
    </StyledModal>
  );
};

export default ViewMoreAddressModal;
