import { BoxProps, IconButtonProps, Modal, ModalProps, useTheme } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { IconBaseProps } from "react-icons/lib";
import { forwardRef } from "react";

import { CloseButton, ContentContainer, ModalContainer, WrapTitle } from "./styles";

interface Props extends Omit<BoxProps, "title"> {
  open: boolean;
  onClose: () => void;
  modalProps?: Partial<ModalProps>;
  closeButtonProps?: IconButtonProps;
  closeIconProps?: IconBaseProps;
  closeButton?: React.ReactNode;
  title?: React.ReactNode;
  titleProps?: BoxProps;
  modalContainerProps?: BoxProps;
  isCenterWithoutPosition?: boolean;
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
    closeIconProps,
    isCenterWithoutPosition,
    ...contentProps
  } = props;
  const theme = useTheme();
  const centerWithFlex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <Modal open={open} onClose={onClose} sx={isCenterWithoutPosition ? centerWithFlex : {}} {...modalProps}>
      <ModalContainer {...modalContainerProps} isCenterWithoutPosition={isCenterWithoutPosition}>
        {closeButton || (
          <CloseButton {...closeButtonProps} onClick={onClose} data-testid="close-modal-button">
            <IoMdClose color={theme.palette.secondary.light} {...closeIconProps} />
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
