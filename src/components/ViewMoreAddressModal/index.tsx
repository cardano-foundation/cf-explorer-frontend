import React from 'react';
import StyledModal from '../commons/StyledModal';
import { List } from '@mui/material';
import CopyButton from '../commons/CopyButton';
import { ModalTitle, StyledListItem, StyledListItemText } from './styles';
import { formatHash } from '../../commons/utils/helper';

export interface ViewMoreAddressModalProps {
  title?: string;
  items?: string[];
  open: boolean;
  onClose?: () => void;
  onItemClick?: (item: string) => void;
  showFullHash?: boolean;
}

const ViewMoreAddressModal: React.FC<ViewMoreAddressModalProps> = ({
  title,
  items,
  open,
  showFullHash,
  onClose,
  onItemClick
}) => {
  return (
    <StyledModal width={620} open={open} handleCloseModal={() => onClose?.()}>
      <>
        {title && <ModalTitle>{title}</ModalTitle>}
        <List>
          {items?.length &&
            items.map((text, idx) => (
              <StyledListItem key={idx}>
                <StyledListItemText onClick={() => onItemClick?.(text)}>
                  {showFullHash ? text : formatHash(text)}
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
