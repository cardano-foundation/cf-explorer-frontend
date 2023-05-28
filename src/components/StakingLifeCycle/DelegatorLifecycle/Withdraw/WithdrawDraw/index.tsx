import { Box } from "@mui/material";
import { useRef, useMemo } from "react";
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
import { formatADA, formatDateTimeLocal, getShortHash } from "../../../../../commons/utils/helper";
import { useHistory, useParams } from "react-router-dom";
import CustomTooltip from "../../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../../SPOLifecycle/Registration/styles";
import {
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  PaymentWalletUrl,
  WalletIconRewardGreen,
  RewardAccountIconUrl
} from "~/commons/resources";
import { LineArrowItem } from "~/components/commons/LineArrow";
import DrawPath from "~/components/commons/DrawPath";
import { useSelector } from "react-redux";
import AdaHolder from "~/components/commons/AdaHolder";
import CardanoSystem from "~/components/commons/CardanoSystem";
import useFetch from "~/commons/hooks/useFetch";
import { API } from "~/commons/utils/api";
import { details } from "~/commons/routers";
import { StyledLink } from "../../Registration/styles";

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
  const cadarnoSystemRef = useRef(null);
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const handleBack = () => {
    history.goBack();
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["center", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" }
      },
      {
        start: netAmountRef,
        startPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endOffset: { 0: [86, 0], sm: [97, 0], lg: [0, -70] },
        startOffset: { 0: [0, -15], lg: [0] },
        arrow: { 0: "bottom", lg: "right" },
        autoAlign: { 0: "end-vertical", lg: "end-horizontal" }
      },
      {
        start: paymentRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: withDrawnRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-86, 0], sm: [-97, 0], lg: [0, 70] },
        endOffset: { 0: [0, -15], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "start-vertical", lg: "start-horizontal" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "top"], lg: ["center", "top"] },
        end: netAmountRef,
        endPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        startOffset: { 0: [0, 15], lg: [0] },
        arrow: { 0: "bottom", lg: "right" },
        fold: { 0: "none", lg: "vertical" }
      },
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["right", "top"], lg: ["left", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        startOffset: { 0: [-25, 45], sm: [-15, 45], lg: [15, 0] },
        arrow: { 0: "bottom", lg: "right" }
      },
      {
        start: withDrawnRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        endOffset: { 0: [25, 45], sm: [15, 45], lg: [15, 70] },
        arrow: { 0: "top", lg: "left" }
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
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(amount || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer sidebar={+sidebar}>
        <AdaHolder ref={adaHolderRef} />
        <AccountContainer ref={paymentRef} sidebar={+sidebar}>
          <PaymentWalletContainer>
            <PaymentWalletIcon src={PaymentWalletUrl} alt='PaymentWallet' />
            <PaymentWalletInfo>
              <PaymentWalletTitle>Payment Wallet</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <WalletIconRewardGreen />
                  <PaymentWalleValue>{formatADA(stakeTotalAmount || 0)}</PaymentWalleValue>
                  <StyledAdaLogoIcon />
                </PaymentWalletIconBox>
              </PaymentWalletValueContainer>
            </PaymentWalletInfo>
          </PaymentWalletContainer>
          <PaymentWalletContainer>
            <PaymentWalletIcon src={RewardAccountIconUrl} alt='PaymentWallet' />
            <PaymentWalletInfo>
              <PaymentWalletTitle>Reward Account</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <WalletIconRewardGreen />
                  <PaymentWalleValue>{formatADA(stakeRewardAvailable || 0)}</PaymentWalleValue>
                  <StyledAdaLogoIcon />
                </PaymentWalletIconBox>
              </PaymentWalletValueContainer>
            </PaymentWalletInfo>
          </PaymentWalletContainer>
        </AccountContainer>
        <AmountGroup sidebar={+sidebar}>
          <BoxGroup sidebar={+sidebar}>
            <NetAmountBox ref={netAmountRef} value={amount && fee ? amount - fee : 0} txHash={txHash || ""} />
            <WithdrawnBox ref={withDrawnRef} value={amount || 0} txHash={txHash || ""} />
          </BoxGroup>
          <BoxGroup sidebar={+sidebar}>
            <StyledFeeBox ref={feeRef} value={fee || 0} txHash={txHash || ""} />
            <BufferBox sidebar={+sidebar} />
          </BoxGroup>
        </AmountGroup>
        <CardanoSystem ref={cadarnoSystemRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
