import InfoGraphicImage from "src/commons/resources/images/infographic.png";

import StyledModal from "../commons/StyledModal";
import { Image } from "./styles";

interface IInfoGraphicModalProps {
  open: boolean;
  handleCloseModal: () => void;
}
const InfoGraphicModal: React.FC<IInfoGraphicModalProps> = (props) => {
  return (
    <StyledModal width={450} {...props}>
      <Image src={InfoGraphicImage} alt="info grapphic" />
    </StyledModal>
  );
};

export default InfoGraphicModal;
