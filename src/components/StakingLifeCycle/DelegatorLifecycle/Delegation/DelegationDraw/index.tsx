import { useMemo, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

import { details } from "src/commons/routers";
import { AddressIcon, BackIcon, TimeIcon } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import DrawSkeleton from "src/components/commons/DrawSkeleton";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import ADAicon from "src/components/commons/ADAIcon";

import {
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  StepInfo,
  DrawContainer,
  FeeBox,
  MiddleGroup,
  StyledAdaHolder,
  StyledCertificateShape,
  StyledLink,
  StyledCopyButton
} from "./styles";

export interface IDelegationDrawProps {
  toggleModal: () => void;
  showBackButton: boolean;
}

const DelegationDraw: React.FC<IDelegationDrawProps> = ({ toggleModal, showBackButton }) => {
  const history = useHistory();
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();

  const { data, error, initialized } = useFetch<DelegationDetail>(
    txHash && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stakeId, txHash)
  );

  const adaHolderRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const theme = useTheme();

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "delegation"));
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["center", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "top"], sm: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-18, -54], sm: [-10, 0], lg: [0] },
        endOffset: { sm: [0, 10], lg: [20] },
        fold: { sm: "horizontal", lg: "none" },
        arrow: { 0: "top" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "bottom"], sm: ["center", "bottom"], lg: ["center", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        endOffset: { 0: [-18, 52], sm: [-10, 0], lg: [10, 0] },
        startOffset: { 0: [0, 0], sm: [0], lg: [0] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "right", lg: "left" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [18, -54], sm: [10, 0], lg: [0] },
        endOffset: { sm: [0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [18, 52], sm: [10], lg: [0, 3] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { xs: "none", sm: "vertical", lg: "horizontal" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      }
    ];
  }, []);

  if (!txHash) return null;

  if (error) return <NoRecord />;

  if (!data || !initialized) return <DrawSkeleton data-testid="delegator-delegation-draw-skeleton" />;

  const { fee, stakeTotalAmount, time } = data;

  return (
    <Box data-testid="delegator-delegation-container">
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack data-testid="delegator-delegation-back-button" onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
        ) : (
          <Box />
        )}
        <InfoGroup>
          <Info>
            <AddressIcon fill={theme.palette.secondary.light} />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash)}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton data-testid="delegator-delegation-copy-button" text={txHash} />
          </Info>
          <Info>
            <ADAicon />
            <InfoText data-testid="delegator-delegation-fee">{formatADAFull(fee)}</InfoText>
          </Info>
          <Info>
            <TimeIcon fill={theme.palette.secondary.light} />
            <InfoText>{formatDateTimeLocal(time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <StyledAdaHolder data-testid="delegator-delegation-ada-holder" ref={adaHolderRef} value={stakeTotalAmount} />
        <MiddleGroup>
          <FeeBox data-testid="delegator-delegation-fee-box" ref={feeRef} value={fee} txHash={txHash} />
          <StyledCertificateShape
            data-testid="delegator-delegation-certificate"
            onClick={toggleModal}
            ref={certificateRef}
          >
            Delegation Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoBlockchain data-testid="delegator-delegation-cardano-blockchain" ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};

export default DelegationDraw;
