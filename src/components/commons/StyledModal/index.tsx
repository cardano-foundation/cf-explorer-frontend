import { Box, Modal, ModalProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ModalContainer, WrapTitle } from "./styles";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
  title?: string;
  width?: number | string;
  height?: number | string;
}
const StyledModal: React.FC<IProps> = ({ open, handleCloseModal, children, title, width, height }) => {
  return (
    <Modal open={open}>
      <ModalContainer width={width} height={height}>
        <CloseButton saving={0} onClick={() => handleCloseModal()}>
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
