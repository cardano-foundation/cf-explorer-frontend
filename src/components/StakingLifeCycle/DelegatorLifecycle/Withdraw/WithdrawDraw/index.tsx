import { Box, useTheme } from "@mui/material";
import { useRef, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import {
  BackIcon,
  AddressIcon,
  TimeIcon,
  PaymentWalletUrl,
  WalletIconRewardGreen,
  RewardAccountIconUrl,
  RewardAccountIconDarkUrl,
  PaymentWalletDarkUrl,
  WalletIconRewardGreenDark,
  AddressIconDark2,
  TimeIconDark,
  BackDarkIcon
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
import ADAicon from "src/components/commons/ADAIcon";
import { StyledADASymbol } from "src/components/commons/SVGIcon/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

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
  StyledAdaLogoIcon,
  AmountWithIconBox
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
  const { t } = useTranslation();
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
        startPosition: { 0: ["center", "bottom"], laptop: ["center", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "top"], laptop: ["left", "middle"] },
        arrow: { 0: "top", laptop: "left" }
      },
      {
        start: netAmountRef,
        startPosition: { 0: ["center", "top"], laptop: ["left", "middle"] },
        end: paymentRef,
        endPosition: { 0: ["center", "bottom"], laptop: ["right", "middle"] },
        startOffset: { 0: [0, -15], laptop: [0] },
        arrow: { 0: "bottom", laptop: "right" },
        autoAlign: { 0: "start-vertical", laptop: "start-horizontal" }
      },
      {
        start: paymentRef,
        startPosition: { 0: ["center", "bottom"], laptop: ["right", "middle"] },
        end: withDrawnRef,
        endPosition: { 0: ["center", "top"], laptop: ["left", "middle"] },
        endOffset: { 0: [0, -15], laptop: [0] },
        arrow: { 0: "top", laptop: "left" },
        autoAlign: { 0: "end-vertical", laptop: "end-horizontal" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "top"], laptop: ["center", "top"] },
        end: netAmountRef,
        endPosition: { 0: ["center", "bottom"], laptop: ["right", "middle"] },
        startOffset: { 0: [0, 15], laptop: [0] },
        arrow: { 0: "bottom", laptop: "right" },
        fold: { 0: "none", laptop: "vertical" }
      },
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["right", "top"], laptop: ["left", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "bottom"], laptop: ["right", "middle"] },
        startOffset: { 0: [0, 45], laptop: [15, 0] },
        arrow: { 0: "bottom", laptop: "right" },
        autoAlign: { 0: "end-vertical", laptop: "none" }
      },
      {
        start: withDrawnRef,
        startPosition: { 0: ["center", "bottom"], laptop: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], laptop: ["left", "middle"] },
        endOffset: { 0: [0, 45], sm: [0, 45], laptop: [15] },
        arrow: { 0: "top", laptop: "left" },
        autoAlign: { 0: "start-vertical", laptop: "start-horizontal" }
      }
    ];
  }, []);
  if (loading) return null;
  return (
    <Box>
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack data-testid="back-button" onClick={handleBack}>
            {theme.isDark ? <BackDarkIcon data-testid="back-icon" /> : <BackIcon data-testid="back-icon" />}
          </IconButtonBack>
        ) : (
          <Box />
        )}

        <InfoGroup>
          <Info>
            <CustomIcon
              icon={theme.isDark ? AddressIconDark2 : AddressIcon}
              height={30}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <StyledADASymbol>
              <ADAicon fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light} />
            </StyledADASymbol>
            <InfoText>{formatADAFull(amount || 0)}</InfoText>
          </Info>
          <Info>
            <CustomIcon
              icon={theme.isDark ? TimeIconDark : TimeIcon}
              height={30}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
            <DatetimeTypeTooltip>
              <InfoText>{formatDateTimeLocal(time || "")}</InfoText>
            </DatetimeTypeTooltip>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <AdaHolder ref={adaHolderRef} />
        <AccountContainer ref={paymentRef}>
          <PaymentWalletContainer>
            <PaymentWalletIcon src={theme.isDark ? PaymentWalletDarkUrl : PaymentWalletUrl} alt="PaymentWallet" />
            <PaymentWalletInfo>
              <PaymentWalletTitle>{t("common.paymentWallet")}</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <CustomIcon icon={theme.isDark ? WalletIconRewardGreenDark : WalletIconRewardGreen} height={29} />
                  <AmountWithIconBox>
                    <PaymentWalleValue>{formatADAFull(stakeTotalAmount || 0)}</PaymentWalleValue>
                    <StyledAdaLogoIcon />
                  </AmountWithIconBox>
                </PaymentWalletIconBox>
              </PaymentWalletValueContainer>
            </PaymentWalletInfo>
          </PaymentWalletContainer>
          <PaymentWalletContainer>
            <PaymentWalletIcon
              src={theme.isDark ? RewardAccountIconDarkUrl : RewardAccountIconUrl}
              alt="PaymentWallet"
            />
            <PaymentWalletInfo>
              <PaymentWalletTitle>{t("glossary.rewardAccount")}</PaymentWalletTitle>
              <PaymentWalletValueContainer>
                <PaymentWalletIconBox>
                  <CustomIcon icon={theme.isDark ? WalletIconRewardGreenDark : WalletIconRewardGreen} height={29} />
                  <AmountWithIconBox>
                    <PaymentWalleValue>{formatADAFull(stakeRewardAvailable || 0)}</PaymentWalleValue>
                    <StyledAdaLogoIcon />
                  </AmountWithIconBox>
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
