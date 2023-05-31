import { Box, Skeleton, styled } from "@mui/material";
import { useState } from "react";
import { Link as LinkDom, useHistory, useParams } from "react-router-dom";

import { ADAGreen, AddressIcon, BackIcon, TimeIcon } from "../../../../commons/resources";

import { FilterParams } from "src/components/StackingFilter";
import useFetch from "../../../../commons/hooks/useFetch";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import StyledModal from "../../../commons/StyledModal";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { StakeLink, StyledLink } from "../Registration/styles";
import DeregistrationDraw from "./DeregistrationDraw";
import RecentDeregistrations from "./RecentDeregistration";
import { IconButtonBack, Info, InfoGroup, InfoText, StepInfo, StyledContainerModal } from "./styles";

const Deregistration = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [selected, setSelected] = useState<DeregistrationItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (deregistration: DeregistrationItem | null) => {
    setSelected(deregistration);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  return (
    <Box>
      <DeregistrationCertificateModal open={openModal} handleCloseModal={handleToggleModal} stake={stakeId} />
      <RecentDeregistrations
        onSelect={handleSelect}
        params={params}
        setParams={setParams}
        setShowBackButton={setShowBackButton}
      />
      {selected && (
        <DeregistrationTimeline selected={selected} toggleModal={handleToggleModal} showBackButton={showBackButton} />
      )}
    </Box>
  );
};
export default Deregistration;

type DeregistrationProps = {
  selected: DeregistrationItem;
  toggleModal: () => void;
  showBackButton?: boolean;
};

const DeregistrationTimeline = ({ selected, toggleModal, showBackButton }: DeregistrationProps) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "deregistration"));
  };

  return (
    <Box>
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
        ) : (
          <Box />
        )}

        <InfoGroup>
          <Info>
            <AddressIcon fill="#438F68" />
            <CustomTooltip title={selected.txHash}>
              <InfoText>
                <StyledLink to={details.transaction(selected.txHash)}>{getShortHash(selected.txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(Math.abs(selected.deposit) - selected.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(selected.time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DeregistrationDraw toggleCertificateModal={toggleModal} data={selected} />
    </Box>
  );
};

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
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Stake Key
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
