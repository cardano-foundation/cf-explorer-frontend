import { Box } from "@mui/material";
import { useRef, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import {
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  PaymentWalletUrl,
  WalletIconRewardGreen,
  RewardAccountIconUrl
} from "src/commons/resources";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";
import AdaHolder from "src/components/commons/AdaHolder";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledCopyButton } from "src/components/StakingLifeCycle/SPOLifecycle/Registration/styles";

import { StyledLink } from "../../Registration/styles";
import {
  DrawContainer,
  BoxGroup,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  AmountGroup,
  StepInfo,
  WithdrawnBox,
  NetAmountBox,
  PaymentWalletContainer,
  AccountContainer,
  PaymentWalletIcon,
  PaymentWalletInfo,
  PaymentWalletTitle,
  PaymentWalletValueContainer,
  PaymentWalletIconBox,
  PaymentWalleValue,
  BufferBox,
  StyledFeeBox,
  StyledAdaLogoIcon
} from "./styles";

export interface WithdrawDetail {
  amount: number;
  fee: number;
  stakeRewardAvailable: number;
  stakeTotalAmount: number;
  time: string;
  txHash: string;
}

interface Props {
  setSelected: (withdraw: WithdrawItem | null) => void;
  selected: WithdrawItem;
  showBackButton?: boolean;
}

export const WithdrawnDraw = ({ selected, showBackButton }: Props) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<WithdrawDetail>(
    selected.txHash && stakeId && API.STAKE_LIFECYCLE.WITHDRAW_DETAIL(stakeId, selected.txHash)
  );
  const { amount, fee, stakeRewardAvailable, stakeTotalAmount, time, txHash } = data || {};
  const adaHolderRef = useRef(null);
  const paymentRef = useRef(null);
  const withDrawnRef = useRef(null);
  const netAmountRef = useRef(null);
  const feeRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["center", "bottom"], 1440: ["center", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "top"], 1440: ["left", "middle"] },
        arrow: { 0: "top", 1440: "left" }
      },
      {
        start: netAmountRef,
        startPosition: { 0: ["center", "top"], 1440: ["left", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "bottom"], 1440: ["right", "middle"] },
        startOffset: { 0: [0, -15], 1440: [0] },
        arrow: { 0: "bottom", 1440: "right" },
        autoAlign: { 0: "start-vertical", 1440: "start-horizontal" }
      },
      {
        start: paymentRef,
        startPosition: { 0: ["center", "bottom"], 1440: ["right", "middle"] },
        end: withDrawnRef,
        endPosition: { 0: ["center", "top"], 1440: ["left", "middle"] },
        endOffset: { 0: [0, -15], 1440: [0] },
        arrow: { 0: "top", 1440: "left" },
        autoAlign: { 0: "end-vertical", 1440: "end-horizontal" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "top"], 1440: ["center", "top"] },
        end: netAmountRef,
        endPosition: { 0: ["center", "bottom"], 1440: ["right", "middle"] },
        startOffset: { 0: [0, 15], 1440: [0] },
        arrow: { 0: "bottom", 1440: "right" },
        fold: { 0: "none", 1440: "vertical" }
      },
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["right", "top"], 1440: ["left", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "bottom"], 1440: ["right", "middle"] },
        startOffset: { 0: [0, 45], 1440: [15, 0] },
        arrow: { 0: "bottom", 1440: "right" },
        autoAlign: { 0: "end-vertical", 1440: "none" }
      },
      {
        start: withDrawnRef,
        startPosition: { 0: ["center", "bottom"], 1440: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], 1440: ["left", "middle"] },
        endOffset: { 0: [0, 45], sm: [0, 45], 1440: [15] },
        arrow: { 0: "top", 1440: "left" },
        autoAlign: { 0: "start-vertical", 1440: "start-horizontal" }
      }
    ];
  }, []);
  if (loading) return null;
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
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(amount || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <AdaHolder ref={adaHolderRef} />
        <AccountContainer ref={paymentRef}>
          <PaymentWalletContainer>
            <PaymentWalletIcon src={PaymentWalletUrl} alt="PaymentWallet" />
            <PaymentWalletInfo>
              <PaymentWalletTitle>Payment Wallet</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <WalletIconRewardGreen />
                  <PaymentWalleValue>{formatADAFull(stakeTotalAmount || 0)}</PaymentWalleValue>
                  <StyledAdaLogoIcon />
                </PaymentWalletIconBox>
              </PaymentWalletValueContainer>
            </PaymentWalletInfo>
          </PaymentWalletContainer>
          <PaymentWalletContainer>
            <PaymentWalletIcon src={RewardAccountIconUrl} alt="PaymentWallet" />
            <PaymentWalletInfo>
              <PaymentWalletTitle>Reward Account</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <WalletIconRewardGreen />
                  <PaymentWalleValue>{formatADAFull(stakeRewardAvailable || 0)}</PaymentWalleValue>
                  <StyledAdaLogoIcon />
                </PaymentWalletIconBox>
              </PaymentWalletValueContainer>
            </PaymentWalletInfo>
          </PaymentWalletContainer>
        </AccountContainer>
        <AmountGroup>
          <BoxGroup>
            <NetAmountBox ref={netAmountRef} value={amount && fee ? amount - fee : 0} txHash={txHash || ""} />
            <WithdrawnBox ref={withDrawnRef} value={amount || 0} txHash={txHash || ""} />
          </BoxGroup>
          <BoxGroup>
            <StyledFeeBox ref={feeRef} value={fee || 0} txHash={txHash || ""} />
            <BufferBox />
          </BoxGroup>
        </AmountGroup>
        <CardanoBlockchain ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
