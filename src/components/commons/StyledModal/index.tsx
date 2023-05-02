import { Modal, ModalProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ModalContainer } from "./styles";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
}
const StyledModal: React.FC<IProps> = ({ open, handleCloseModal, children }) => {
  return (
    <Modal open={open}>
      <ModalContainer>
        <CloseButton saving={false} onClick={() => handleCloseModal()}>
          <IoMdClose />
        </CloseButton>
        {children}
      </ModalContainer>
    </Modal>
  );
};

export default StyledModal;
