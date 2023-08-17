import { useMemo, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import DrawSkeleton from "src/components/commons/DrawSkeleton";
import { AddressIcon, BackIcon, ExclamationTriangleIcon, TimeIcon } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomIcon from "src/components/commons/CustomIcon";
import AdaHolder from "src/components/commons/AdaHolder";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import ADAicon from "src/components/commons/ADAIcon";
import { StyledADASymbol } from "src/components/commons/SVGIcon/styles";

import {
  BoxGroup,
  DrawContainer,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo,
  StyledCertificateShape,
  StyledCopyButton,
  StyledFeeBox,
  StyledLink,
  StyledWithHoldBox
} from "./styles";

interface Props {
  toggleModal: () => void;
  showBackButton: boolean;
}

const DeregistrationDraw: React.FC<Props> = ({ toggleModal, showBackButton }) => {
  const history = useHistory();
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();

  const { data, error, initialized } = useFetch<DeregistrationDetail>(
    txHash && API.STAKE_LIFECYCLE.DEREGISTRATION_DETAIL(stakeId, txHash)
  );

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const theme = useTheme();

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "deregistration"));
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [22, -52], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [22, 49], sm: [10, 0], lg: [0] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { sm: "vertical", lg: "horizontal" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: feeRef,
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        startOffset: { lg: [-8, 0] },
        endOffset: { sm: [46, 0], lg: [0] },
        autoAlign: { 0: "start-vertical", md: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["left", "top"], sm: ["left", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { sm: [46, 0], lg: [0] },
        endOffset: { lg: [8, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "end-vertical", md: "none" }
      },
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["right", "middle"], lg: ["left", "top"] },
        end: holdRef,
        endPosition: { 0: ["right", "bottom"], sm: ["center", "bottom"], lg: ["right", "middle"] },
        startOffset: { 0: [-10, 0], sm: [-10, 0], lg: [10, 54] },
        endOffset: { 0: [-16, 0], sm: [0, 0] },
        fold: { 0: "horizontal", lg: "none" }
      },
      {
        start: holdRef,
        startPosition: { 0: ["right", "top"], sm: ["center", "top"], lg: ["left", "middle"] },
        end: adaHolderRef,
        endPosition: { 0: ["right", "middle"], lg: ["right", "top"] },
        startOffset: { 0: [-16, 0], sm: [0] },
        endOffset: { 0: [-12, 0], lg: [-16, 54.2] },
        fold: { 0: "vertical", lg: "none" },
        arrow: { 0: "right" }
      }
    ];
  }, []);

  if (!txHash) return null;

  if (error) return <NoRecord />;

  if (!data || !initialized) return <DrawSkeleton data-testid="delegator-deregistration-draw-skeleton" />;

  const { deposit, fee, time, joinDepositPaid } = data;

  return (
    <Box>
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack data-testid="delegator-deregistration-back-button" onClick={handleBack}>
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
            <StyledCopyButton data-testid="delegator-deregistration-copy-button" text={txHash} />
          </Info>
          <Info>
            <StyledADASymbol>
              <ADAicon />
            </StyledADASymbol>
            <InfoText>{formatADAFull(Math.abs(deposit) - fee)}</InfoText>
          </Info>
          <Info>
            <TimeIcon fill={theme.palette.secondary.light} />
            <InfoText>{formatDateTimeLocal(time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <AdaHolder ref={adaHolderRef} />
        <MiddleGroup>
          <BoxGroup>
            <StyledWithHoldBox
              data-testid="delegator-deregistration-hold-box"
              roundingNumber={1}
              ref={holdRef}
              value={Math.abs(deposit)}
              txHash={txHash}
            >
              {!joinDepositPaid && (
                <CustomTooltip title="Paid by different address">
                  <CustomIcon
                    data-testid="delegator-deregistration-join-deposit-paid"
                    icon={ExclamationTriangleIcon}
                    width={24}
                  />
                </CustomTooltip>
              )}
            </StyledWithHoldBox>
            <StyledFeeBox data-testid="delegator-deregistration-fee-box" ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape
            data-testid="delegator-deregistration-certificate"
            onClick={toggleModal}
            ref={certificateRef}
          >
            Deregistration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoBlockchain data-testid="delegator-deregistration-cardano-blockchain" ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};

export default DeregistrationDraw;
