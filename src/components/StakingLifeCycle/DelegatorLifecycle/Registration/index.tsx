import { alpha, Box, Skeleton } from "@mui/material";
import { useState } from "react";


import {
  StakeLink} from "./styles";
import RecentRegistrations from "./RecentRegistrations";
import StyledModal from "../../../commons/StyledModal";
import { useParams } from "react-router-dom";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import { RegistrationDraw } from "./RegistrationDraw";

const Registration = ({ handleResize }: { handleResize: () => void }) => {
  const [selected, setSelected] = useState<RegistrationItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const handleSelect = (registration: RegistrationItem | null) => {
    setSelected(registration);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
      <Box>
        <RecentRegistrations onSelect={handleSelect} />
      </Box>
      <Box>
        {selected && (
          <RegistrationDraw setSelected={setSelected} registration={selected} toggleModal={handleToggleModal} />
        )}
      </Box>
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
    <StyledModal width={550} {...props} title='Registration certificate'>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
        {loading && <Skeleton variant='rectangular' width={500} height={90} />}
        {!loading && (
          <Box>
            <Box fontWeight={"bold"} mb={1} fontSize={"1rem"} color={({ palette }) => palette.grey[400]}>
              STAKE KEY
            </Box>
            {data && (
              <Box>
                <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                <CopyButton text={stake} />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </StyledModal>
  );
};
