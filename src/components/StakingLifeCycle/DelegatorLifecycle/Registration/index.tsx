import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";

import RecentRegistrations from "./RecentRegistrations";
import { RegistrationDraw } from "./RegistrationDraw";
import { StakeLink, StyledCustomModal } from "./styles";
import DelegatorDetailContext from "../DelegatorDetailContext";

const Registration = () => {
  const [openModal, setOpenModal] = useState(false);
  const { stakeId = "" } = useParams<{ stakeId: string }>();

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const toggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
      <RecentRegistrations setShowBackButton={setShowBackButton} />
      <RegistrationDraw toggleModal={toggleModal} showBackButton={showBackButton} />
    </Box>
  );
};
export default Registration;

interface RegistrationCertificateModalProps {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}

export const RegistrationCertificateModal = ({ stake, open, handleCloseModal }: RegistrationCertificateModalProps) => {
  const data = useContext(DelegatorDetailContext);
  const { t } = useTranslation();

  return (
    <StyledCustomModal open={open} onClose={handleCloseModal} title="Registration certificate">
      <Box p={3}>
        <Box fontWeight={"bold"} mb={1} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
          {t("common.stakeAddress")}
        </Box>
        {data && (
          <Box display={"flex"} alignItems={"center"}>
            <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
            <CopyButton text={stake} />
          </Box>
        )}
      </Box>
    </StyledCustomModal>
  );
};
