import { Box } from "@mui/material";
import { useRef, useMemo } from "react";

import {
  DrawContainer,
  BoxGroup,
  StyledCertificateShape,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo
} from "./styles";
import { formatADAFull, getShortHash } from "../../../../../commons/utils/helper";
import moment from "moment";
import { useHistory } from "react-router-dom";
import CustomTooltip from "../../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../../SPOLifecycle/Registration/styles";
import { BackIcon, AddressIcon, ADAGreen, TimeIcon } from "~/commons/resources";
import { LineArrowItem } from "~/components/commons/LineArrow";
import DrawPath from "~/components/commons/DrawPath";
import { useSelector } from "react-redux";
import CardanoSystem from "~/components/commons/CardanoSystem";
import FeeBox from "~/components/commons/FeeBox";
import { details } from "~/commons/routers";
import { StyledLink } from "../../styles";
import SPOHolder from "~/components/commons/SPOHolder";
import HoldBoxSPORed from "~/components/commons/HoldBoxSPORed";

interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[];
  txHash?: string;
}
interface Props {
  setSelected: (registration: SPORegistration | null) => void;
  registration: SPORegistration;
  toggleModal?: () => void;
  data: ISPOPropsData | null;
}

export const RegistrationDraw = ({ registration, toggleModal, data }: Props) => {
  const { poolHold, fee, time, txHash } = registration;
  const { poolName, poolView, stakeKeys } = data ?? {};

  const SPOPoolRef = useRef(null);
  const poolHoldRef = useRef(null);
  const feeRef = useRef(null);
  const registrationRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const handleBack = () => {
    history.goBack();
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: SPOPoolRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], md: ["center", "middle"] },
        end: poolHoldRef,
        endPosition: { 0: ["center", "top"], md: ["left", "middle"] },
        startOffset: { 0: [-1, -50], sm: [-10, 0], md: [0] },
        endOffset: { 0: [8, -10], md: [0] },
        arrow: { 0: "top", md: "left" },
        fold: { sm: "horizontal", md: "none" }
      },
      {
        start: poolHoldRef,
        startPosition: { 0: ["center", "bottom"], md: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], md: ["left", "middle"] },
        startOffset: { 0: [8, -15], md: [0] },
        endOffset: { 0: [-18, 45], sm: [-10], md: [10] },
        fold: { sm: "vertical", md: "none" },
        arrow: { 0: "top", sm: "right", md: "left" }
      },
      {
        start: SPOPoolRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], md: ["center", "middle"] },
        end: registrationRef,
        endPosition: { 0: ["center", "top"], md: ["left", "middle"] },
        startOffset: { 0: [1, -50], sm: [10, 0], md: [0] },
        fold: { sm: "horizontal", md: "vertical" }
      },
      {
        start: registrationRef,
        startPosition: { 0: ["center", "bottom"], md: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], md: ["center", "bottom"] },
        endOffset: { 0: [18, 45], sm: [10], md: [0, 3] },
        fold: { sm: "vertical", md: "horizontal" },
        arrow: { 0: "top", sm: "left", md: "bottom" }
      }
    ];
  }, []);

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(poolHold + fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer sidebar={+sidebar}>
        <SPOHolder ref={SPOPoolRef} data={{ poolName, poolView, stakeKeys }} />
        <MiddleGroup sidebar={+sidebar}>
          <BoxGroup sidebar={+sidebar}>
            <HoldBoxSPORed ref={poolHoldRef} value={poolHold} txHash={txHash} />
            <FeeBox ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={registrationRef}>
            Pool Registration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <Box mt={2}>
          <CardanoSystem ref={cadarnoSystemRef} />
        </Box>
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
