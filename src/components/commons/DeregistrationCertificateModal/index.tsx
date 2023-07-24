import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

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
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);

  return (
    <StyledModal {...props} width={550} title="Deregistration certificate">
      <Box>
        {loading && <Skeleton variant="rectangular" width={500} height={90} />}
        {!loading && (
          <StyledContainerModal>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.main}>
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
        )}
      </Box>
    </StyledModal>
  );
};
