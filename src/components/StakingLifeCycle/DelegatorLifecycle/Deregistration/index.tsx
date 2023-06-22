import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ADAGreen, AddressIcon, BackIcon, TimeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { FilterParams } from "src/components/StackingFilter";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { DeregistrationCertificateModal } from "src/components/commons/DeregistrationCertificateModal";

import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { StyledLink } from "../Registration/styles";
import DeregistrationDraw from "./DeregistrationDraw";
import RecentDeregistrations from "./RecentDeregistration";
import { IconButtonBack, Info, InfoGroup, InfoText, StepInfo } from "./styles";

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

export const DeregistrationTimeline = ({ selected, toggleModal, showBackButton }: DeregistrationProps) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "deregistration"));
  };

  return (
    <Box>
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack data-testid="back-button" onClick={handleBack}>
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
