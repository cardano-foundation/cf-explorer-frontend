import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";

import RecentRegistrations from "./RecentRegistrations";
import { RegistrationDraw } from "./RegistrationDraw";
import { StakeLink, StyledCustomModal, WrapContent } from "./styles";

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
  const { t } = useTranslation();
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`);

  return (
    <StyledCustomModal open={open} onClose={handleCloseModal} title={t("sklc.registrationCertificate")}>
      {loading && <Skeleton variant="rectangular" width={500} height={90} />}
      {!loading && (
        <WrapContent>
          <Box fontWeight={"bold"} mb={1} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
            {t("common.stakeAddress")}
          </Box>
          {data && (
            <Box display={"flex"} alignItems={"center"}>
              <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
              <CopyButton text={stake} />
            </Box>
          )}
        </WrapContent>
      )}
    </StyledCustomModal>
  );
};
