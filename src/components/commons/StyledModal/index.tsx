import { Box, Modal, ModalProps, SxProps, useTheme } from "@mui/material";
import { IoMdClose } from "react-icons/io";

import { useScreen } from "src/commons/hooks/useScreen";

import { CloseButton, ContentContainer, ModalContainer, WrapTitle } from "./styles";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
  title?: string;
  width?: number | string;
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  contentStyle?: SxProps;
  modalStyle?: SxProps;
}
const StyledModal: React.FC<IProps> = ({
  open,
  handleCloseModal,
  children,
  title,
  width,
  height,
  paddingX,
  paddingY,
  contentStyle = {},
  modalStyle = {}
}) => {
  const { isMobile } = useScreen();
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      sx={{
        zIndex: 1305
      }}
    >
      <ModalContainer
        width={width}
        height={height}
        paddingX={paddingX || (isMobile ? "10px" : "40px")}
        paddingY={paddingY || (isMobile ? "20px" : "50px")}
        viewwidth={isMobile ? 92 : 70}
        sx={modalStyle}
      >
        <CloseButton saving={0} onClick={handleCloseModal} data-testid="close-modal-button">
          <IoMdClose color={theme.palette.secondary.light} />
        </CloseButton>
        {title && (
          <Box marginBottom={"20px"}>
            <WrapTitle>{title}</WrapTitle>
          </Box>
        )}
        <ContentContainer
          sx={{
            ...contentStyle
          }}
        >
          {children}
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default StyledModal;
