import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

import StyledModal from "src/components/commons/StyledModal";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import { FilterParams } from "src/components/StackingFilter";

import RecentRegistrations from "./RecentRegistrations";
import { RegistrationDraw } from "./RegistrationDraw";
import { StakeLink, StyledContainerModal } from "./styles";

const Registration = () => {
  const [selected, setSelected] = useState<RegistrationItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const handleSelect = (registration: RegistrationItem | null) => {
    setSelected(registration);
  };
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
      <RecentRegistrations
        onSelect={handleSelect}
        params={params}
        setParams={setParams}
        setShowBackButton={setShowBackButton}
      />
      {selected && (
        <RegistrationDraw selected={selected} toggleModal={handleToggleModal} showBackButton={showBackButton} />
      )}
    </Box>
  );
};
export default Registration;

export const RegistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);
  return (
    <StyledModal width={550} {...props} title="Registration certificate">
      <StyledContainerModal>
        {loading && <Skeleton variant="rectangular" width={500} height={90} />}
        {!loading && (
          <Box bgcolor={({ palette }) => palette.secondary[0]}>
            <Box fontWeight={"bold"} mb={1} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
              Stake Address
            </Box>
            {data && (
              <Box>
                <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                <CopyButton text={stake} />
              </Box>
            )}
          </Box>
        )}
      </StyledContainerModal>
    </StyledModal>
  );
};
