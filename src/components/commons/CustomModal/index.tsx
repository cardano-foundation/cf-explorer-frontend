import { BoxProps, IconButtonProps, Modal, ModalProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ContentContainer, ModalContainer, WrapTitle } from "./styles";
import { forwardRef } from "react";

interface Props extends Omit<BoxProps, "title"> {
  open: boolean;
  onClose: () => void;
  modalProps?: ModalProps;
  closeButtonProps?: IconButtonProps;
  closeButton?: React.ReactNode;
  title?: React.ReactNode;
  titleProps?: BoxProps;
}

export const CustomModal: React.FC<Props> = forwardRef((props, ref) => {
  const { open, onClose, closeButton, closeButtonProps, title, titleProps, children, ...contentProps } = props;
  return (
    <Modal open={open}>
      <ModalContainer>
        {closeButton || (
          <CloseButton {...closeButtonProps} onClick={onClose} data-testid="close-modal-button">
            <IoMdClose />
          </CloseButton>
        )}
        {title && <WrapTitle {...titleProps}>{title}</WrapTitle>}
        <ContentContainer {...contentProps} ref={ref}>
          {children}
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
});

CustomModal.displayName = "CustomModal";

export default CustomModal;
