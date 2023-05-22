import { alpha, Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as LinkDom, useHistory, useParams } from "react-router-dom";

import {
  ADAGreen,
  AddressIcon,
  BackIcon,
  TimeIcon
} from "../../../../commons/resources";

import { FilterParams } from "~/components/StackingFilter";
import useFetch from "../../../../commons/hooks/useFetch";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADA, formatDateTimeLocal, getShortHash } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import StyledModal from "../../../commons/StyledModal";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { StakeLink } from "../Registration/styles";
import DeregistrationDraw from "./DeregistrationDraw";
import RecentDeregistrations from "./RecentDeregistration";
import { IconButtonBack, Info, InfoGroup, InfoText, StepInfo } from "./styles";

const Deregistration = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
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

  return (
    <Box>
      <DeregistrationCertificateModal open={openModal} handleCloseModal={handleToggleModal} stake={stakeId} />
      <Box>
        <RecentDeregistrations onSelect={handleSelect} params={params} setParams={setParams} />
      </Box>
      {selected && (
        <DeregistrationTimeline
          handleResize={handleResize}
          selected={selected}
          containerPosition={containerPosition}
          toggleModal={handleToggleModal}
        />
      )}
    </Box>
  );
};
export default Deregistration;

const DeregistrationTimeline = ({
  containerPosition,
  handleResize,
  selected,
  toggleModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: DeregistrationItem;
  toggleModal: () => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [selected]);

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "deregistration"));
  };

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={selected.txHash}>
              <InfoText>{getShortHash(selected.txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(Math.abs(selected.deposit) - selected.fee || 0)}</InfoText>
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
    <StyledModal {...props} width={550} title='Deregistration certificate'>
      <Box>
        {loading && <Skeleton variant='rectangular' width={500} height={90} />}
        {!loading && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
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
          </Box>
        )}
      </Box>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
