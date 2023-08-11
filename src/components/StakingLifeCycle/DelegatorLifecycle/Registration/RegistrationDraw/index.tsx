import { Box, useTheme } from "@mui/material";
import { useRef, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { BackIcon, AddressIcon, TimeIcon, ExclamationTriangleIcon } from "src/commons/resources";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";
import AdaHolder from "src/components/commons/AdaHolder";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import FeeBox from "src/components/commons/FeeBox";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import DrawSkeleton from "src/components/commons/DrawSkeleton";
import ADAicon from "src/components/commons/ADAIcon";

import {
  DrawContainer,
  BoxGroup,
  StyledCertificateShape,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo,
  StyledLink,
  StyledCopyButton,
  StyledHoldBox
} from "./styles";

interface Props {
  toggleModal: () => void;
  showBackButton: boolean;
}

export const RegistrationDraw = ({ toggleModal, showBackButton = false }: Props) => {
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();

  const { data, error, initialized } = useFetch<RegistrationDetail>(
    (txHash && API.STAKE_LIFECYCLE.REGISTRATION_DETAIL(stakeId, txHash)) || ""
  );

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const history = useHistory();
  const theme = useTheme();

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "registration"));
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["center", "middle"] },
        end: holdRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-18, -50], sm: [-10, 0], lg: [0] },
        endOffset: { 0: [7.2, 1], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" }
      },
      {
        start: holdRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        startOffset: { 0: [8, -15], lg: [0] },
        endOffset: { 0: [-18, 51], sm: [-10], lg: [10] },
        fold: { sm: "vertical", lg: "none" },
        arrow: { 0: "top", sm: "right", lg: "left" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [18, -50], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [18, 51], sm: [10], lg: [0, 3] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "left", lg: "bottom" }
      }
    ];
  }, []);

  if (!txHash) return null;

  if (error) return <NoRecord />;

  if (!data || !initialized) return <DrawSkeleton data-testid="delegator-registration-draw-skeleton" />;

  const { deposit, fee, time, joinDepositPaid } = data;

  return (
    <Box data-testid="delegator-registration-container">
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack data-testid="delegator-registration-back-button" onClick={handleBack}>
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
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton data-testid="delegator-registration-copy-button" text={txHash} />
          </Info>
          <Info>
            <ADAicon />
            <InfoText>{formatADAFull(deposit + fee || 0)}</InfoText>
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
            <StyledHoldBox
              data-testid="delegator-registration-hold-box"
              ref={holdRef}
              value={deposit}
              txHash={txHash}
              roundingNumber={1}
            >
              {!joinDepositPaid && (
                <CustomTooltip title="Paid by different address">
                  <CustomIcon
                    data-testid="delegator-registration-join-deposit-paid"
                    icon={ExclamationTriangleIcon}
                    width={24}
                  />
                </CustomTooltip>
              )}
            </StyledHoldBox>
            <FeeBox data-testid="delegator-registration-fee-box" ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape
            data-testid="delegator-registration-certificate"
            onClick={toggleModal}
            ref={certificateRef}
          >
            Registration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoBlockchain data-testid="delegator-registration-cardano-blockchain" ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
export default RegistrationDraw;
