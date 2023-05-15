import { Box, Modal, ModalProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ModalContainer, WrapTitle } from "./styles";
import { useScreen } from "../../../commons/hooks/useScreen";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
  title?: string;
  width?: number | string;
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
}
const StyledModal: React.FC<IProps> = ({
  open,
  handleCloseModal,
  children,
  title,
  width,
  height,
  paddingX,
  paddingY
}) => {
  const { isMobile } = useScreen();
  return (
    <Modal open={open}>
      <ModalContainer
        width={width}
        height={height}
        p={`${paddingY || "50px"} ${paddingX || "40px"}`}
        viewwidth={isMobile ? 92 : 70}
      >
        <CloseButton saving={0} onClick={() => handleCloseModal()} data-testid='close-modal-button'>
          <IoMdClose />
        </CloseButton>
        {title && (
          <Box marginBottom={"20px"}>
            <WrapTitle>{title}</WrapTitle>
          </Box>
        )}
        {children}
      </ModalContainer>
    </Modal>
  );
};

export default StyledModal;
