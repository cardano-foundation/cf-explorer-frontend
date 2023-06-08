import React from "react";
import { List } from "@mui/material";

import StyledModal from "../commons/StyledModal";
import CopyButton from "../commons/CopyButton";
import { ModalTitle, StyledListItem, StyledListItemText } from "./styles";
import { getShortHash } from "../../commons/utils/helper";

export interface ViewMoreAddressModalProps {
  title?: string;
  items?: string[];
  open: boolean;
  onClose?: () => void;
  onItemClick?: (item: string) => void;
  showFullHash?: boolean;
  maxWidth?: number;
}

const ViewMoreAddressModal: React.FC<ViewMoreAddressModalProps> = ({
  title,
  items,
  open,
  showFullHash,
  onClose,
  onItemClick,
  maxWidth
}) => {
  return (
    <StyledModal width={maxWidth ? maxWidth : 620} open={open} handleCloseModal={() => onClose?.()}>
      <>
        {title && <ModalTitle>{title}</ModalTitle>}
        <List>
          {items?.length &&
            items.map((text, idx) => (
              <StyledListItem key={idx}>
                <StyledListItemText onClick={() => onItemClick?.(text)}>
                  {showFullHash ? text : getShortHash(text)}
                </StyledListItemText>
                <CopyButton text={text} />
              </StyledListItem>
            ))}
        </List>
      </>
    </StyledModal>
  );
};

export default ViewMoreAddressModal;
