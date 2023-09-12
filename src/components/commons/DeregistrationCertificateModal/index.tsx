import { useContext } from "react";
import { Box } from "@mui/system";

import { details } from "src/commons/routers";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";

import CopyButton from "../CopyButton";
import StyledModal from "../StyledModal";
import { StakeLink, StyledContainerModal } from "./styles";

export const DeregistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const data = useContext(DelegatorDetailContext);

  return (
    <StyledModal {...props} width={550} title="Deregistration certificate">
      <Box>
        <StyledContainerModal>
          <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
            Stake Address
          </Box>
          {data && (
            <Box>
              <Box>
                <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                <CopyButton text={stake} />
              </Box>
            </Box>
          )}
        </StyledContainerModal>
      </Box>
    </StyledModal>
  );
};
