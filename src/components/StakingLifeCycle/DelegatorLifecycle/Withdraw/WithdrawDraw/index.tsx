import { Box, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
        startPosition: { 0: ["center", "bottom"], xl: ["center", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "top"], xl: ["left", "middle"] },
        arrow: { 0: "top", xl: "left" }
      },
      {
        start: netAmountRef,
        startPosition: { 0: ["center", "top"], xl: ["left", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "bottom"], xl: ["right", "middle"] },
        startOffset: { 0: [0, -15], xl: [0] },
        arrow: { 0: "bottom", xl: "right" },
        autoAlign: { 0: "start-vertical", xl: "start-horizontal" }
      },
      {
        start: paymentRef,
        startPosition: { 0: ["center", "bottom"], xl: ["right", "middle"] },
        end: withDrawnRef,
        endPosition: { 0: ["center", "top"], xl: ["left", "middle"] },
        endOffset: { 0: [0, -15], xl: [0] },
        arrow: { 0: "top", xl: "left" },
        autoAlign: { 0: "end-vertical", xl: "end-horizontal" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "top"], xl: ["center", "top"] },
        end: netAmountRef,
        endPosition: { 0: ["center", "bottom"], xl: ["right", "middle"] },
        startOffset: { 0: [0, 15], xl: [0] },
        arrow: { 0: "bottom", xl: "right" },
        fold: { 0: "none", xl: "vertical" }
      },
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["right", "top"], xl: ["left", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "bottom"], xl: ["right", "middle"] },
        startOffset: { 0: [0, 45], xl: [15, 0] },
        arrow: { 0: "bottom", xl: "right" },
        autoAlign: { 0: "end-vertical", xl: "none" }
      },
      {
        start: withDrawnRef,
        startPosition: { 0: ["center", "bottom"], xl: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], xl: ["left", "middle"] },
        endOffset: { 0: [0, 45], sm: [0, 45], xl: [15] },
        arrow: { 0: "top", xl: "left" },
        autoAlign: { 0: "start-vertical", xl: "start-horizontal" }
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
            <AddressIcon fill={theme.palette.green[200]} />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen fill={theme.palette.green[200]} />
            <InfoText>{formatADAFull(amount || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon fill={theme.palette.green[200]} />
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
