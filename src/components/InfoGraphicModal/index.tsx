import InfoGraphicImage from "src/commons/resources/images/infographic.png";

import { Image } from "./styles";
import CustomModal from "../commons/CustomModal";

interface IInfoGraphicModalProps {
  open: boolean;
  onClose: () => void;
}
const InfoGraphicModal: React.FC<IInfoGraphicModalProps> = (props) => {
  return (
    <CustomModal width={450} {...props}>
      <Image src={InfoGraphicImage} alt="info grapphic" />
    </CustomModal>
  );
};

export default InfoGraphicModal;
