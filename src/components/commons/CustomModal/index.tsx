import { BoxProps, IconButtonProps, Modal, ModalProps, useTheme } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { forwardRef } from "react";

import { CloseButton, ContentContainer, ModalContainer, WrapTitle } from "./styles";

interface Props extends Omit<BoxProps, "title"> {
  open: boolean;
  onClose: () => void;
  modalProps?: Partial<ModalProps>;
  closeButtonProps?: IconButtonProps;
  closeButton?: React.ReactNode;
  title?: React.ReactNode;
  titleProps?: BoxProps;
  modalContainerProps?: BoxProps;
}

export const CustomModal: React.FC<Props> = forwardRef((props, ref) => {
  const {
    open,
    onClose,
    closeButton,
    closeButtonProps,
    title,
    titleProps,
    modalProps,
    children,
    modalContainerProps,
    ...contentProps
  } = props;
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose} {...modalProps}>
      <ModalContainer {...modalContainerProps}>
        {closeButton || (
          <CloseButton {...closeButtonProps} onClick={onClose} data-testid="close-modal-button">
            <IoMdClose color={theme.palette.secondary.light} />
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
