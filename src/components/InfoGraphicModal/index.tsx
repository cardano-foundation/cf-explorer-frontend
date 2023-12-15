import { useTheme } from "@mui/material";
import { useEffect } from "react";

import InfoGraphicImage from "src/commons/resources/images/explaning-staking.png";

import { Image } from "./styles";
import CustomModal from "../commons/CustomModal";

interface IInfoGraphicModalProps {
  open: boolean;
  onClose: () => void;
}
const InfoGraphicModal: React.FC<IInfoGraphicModalProps> = (props) => {
  const theme = useTheme();

  useEffect(() => {
    const newImage = new window.Image();
    newImage.src = InfoGraphicImage;
  }, []);

  return (
    <CustomModal
      {...props}
      closeButtonProps={{
        sx: {
          background: theme.isDark ? theme.palette.grey[600] : theme.palette.grey[200],
          border: "none",
          "&:hover": { background: theme.isDark ? theme.palette.grey[600] : theme.palette.grey[200] }
        }
      }}
      closeIconProps={theme.isDark ? { color: theme.palette.common.black } : {}}
      modalProps={{
        sx: {
          "& > div.MuiBox-root": { padding: "25px" },
          "& > div.MuiBox-root > div.MuiBox-root": { maxHeight: "90vh" }
        }
      }}
    >
      <Image src={InfoGraphicImage} alt="info grapphic" />
    </CustomModal>
  );
};

export default InfoGraphicModal;
