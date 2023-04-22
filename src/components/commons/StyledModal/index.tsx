import { Box, Modal, ModalProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ModalContainer, WrapTitle } from "./styles";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
  title?: string;
  width?: number | string;
}
const StyledModal: React.FC<IProps> = ({ open, handleCloseModal, children, title, width }) => {
  return (
    <Modal open={open}>
      <ModalContainer width={width}>
        <CloseButton saving={false} onClick={() => handleCloseModal()}>
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
