import { Box } from "@mui/material";
import { useState } from "react";
import RecentRegistrations from "./RecentRegistrations";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useParams } from "react-router";
import { FilterParams } from "src/components/StackingFilter";
import { RegistrationDraw } from "./RegistrationDraw";
import { RegistrationCertificateModal } from "./RegistrationCertificateModal";

const Registration = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<SPORegistration | null>(null);
  const { data } = useFetch<SPORegistrationDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, selected?.poolUpdateId) : ""
  );
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (registration: SPORegistration | null) => {
    setSelected(registration);
  };

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleToggleCertificateModal = () => setOpenModal((state) => !state);
  return (
    <Box>
      <RecentRegistrations
        params={params}
        setParams={setParams}
        onSelect={handleSelect}
        setShowBackButton={setShowBackButton}
      />
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
