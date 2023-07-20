import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import { RegistrationDraw } from "./RegistrationDraw";
import RecentRegistrations from "./RecentRegistrations";
import { RegistrationCertificateModal } from "./RegistrationCertificateModal";

const Registration = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<SPORegistration | null>(null);
  const { data } = useFetch<SPORegistrationDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, selected?.poolUpdateId) : ""
  );
  const handleSelect = (registration: SPORegistration | null) => {
    setSelected(registration);
  };

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleToggleCertificateModal = () => setOpenModal((state) => !state);
  return (
    <Box>
      <RecentRegistrations onSelect={handleSelect} setShowBackButton={setShowBackButton} />
      {selected && (
        <RegistrationDraw
          selected={selected}
          data={data}
          toggleModal={handleToggleCertificateModal}
          showBackButton={showBackButton}
        />
      )}
      <RegistrationCertificateModal
        poolId={poolId}
        poolUpdateId={selected?.poolUpdateId || 0}
        onClose={handleToggleCertificateModal}
        open={openModal}
      />
    </Box>
  );
};
export default Registration;
