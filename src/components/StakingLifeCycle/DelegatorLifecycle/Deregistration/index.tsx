import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { DeregistrationCertificateModal } from "src/components/commons/DeregistrationCertificateModal";

import DeregistrationDraw from "./DeregistrationDraw";
import RecentDeregistrations from "./RecentDeregistration";

const Deregistration = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const toggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <DeregistrationCertificateModal open={openModal} handleCloseModal={toggleModal} stake={stakeId} />
      <RecentDeregistrations setShowBackButton={setShowBackButton} />
      <DeregistrationDraw toggleModal={toggleModal} showBackButton={showBackButton} />
    </Box>
  );
};
export default Deregistration;
