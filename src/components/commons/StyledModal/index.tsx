import { Box, Modal, ModalProps, SxProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useScreen } from "../../../commons/hooks/useScreen";
import { CloseButton, ContentContainer, ModalContainer, WrapTitle } from "./styles";
import { useSelector } from "react-redux";

interface IProps extends ModalProps {
  handleCloseModal: () => void;
  title?: string;
  width?: number | string;
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  contentStyle?: SxProps;
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
  contentStyle = {}
}) => {
  const { isMobile } = useScreen();

  return (
    <Modal open={open}>
      <ModalContainer
        width={width}
        height={height}
        paddingX={paddingX || (isMobile ? "10px" : "40px")}
        paddingY={paddingY || (isMobile ? "20px" : "50px")}
        viewwidth={isMobile ? 92 : 70}
      >
        <CloseButton saving={0} onClick={() => handleCloseModal()} data-testid="close-modal-button">
          <IoMdClose />
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
