import { Box, Skeleton, alpha } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import { ReactComponent as PaymentWallet } from "../../../../commons/resources/icons/Staking/paymentWallet.svg";
import { ReactComponent as RewardWithdraw } from "../../../../commons/resources/icons/Staking/rewardWithdraw.svg";
import { ReactComponent as WalletIconReward } from "../../../../commons/resources/icons/Staking/walletIconReward.svg";
import { ReactComponent as WalletIconRewardGreen } from "../../../../commons/resources/icons/Staking/walletIconRewardGreen.svg";

import Line from "../../../Line";
import {
  ADAAmountLabel,
  FeeBox,
  IconButton,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  NetAmount,
  Payment,
  RewardAccount,
  RewardWallet,
  RoundBox,
  StepInfo,
  Withdrawn
} from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentWithdraws from "./RecentWithdraws";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useHistory, useParams } from "react-router";
import { formatADA, formatDateTimeLocal, getShortHash } from "../../../../commons/utils/helper";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import CustomTooltip from "../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { details } from "../../../../commons/routers";
import { useScreen } from "~/commons/hooks/useScreen";
import { useWindowSize } from "react-use";

const Withdraw = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<WithdrawItem | null>(null);

  const handleSelect = (withdraw: WithdrawItem | null) => {
    setSelected(withdraw);
  };
  const { width } = useWindowSize(0);
  const laptop = width <= 1560;
  return (
    <Box>
      <Box>
        <RecentWithdraws onSelect={handleSelect} />
      </Box>
      <Box>
        {!!selected &&
          (laptop ? (
            <WithdrawTimeline
              handleResize={handleResize}
              setSelected={setSelected}
              selected={selected}
              containerPosition={containerPosition}
            />
          ) : (
            <WithdrawTimelineDestop
              handleResize={handleResize}
              setSelected={setSelected}
              selected={selected}
              containerPosition={containerPosition}
            />
          ))}
      </Box>
    </Box>
  );
};
export default Withdraw;

interface WithdrawDetail {
  amount: number;
  fee: number;
  stakeRewardAvailable: number;
  stakeTotalAmount: number;
  time: string;
  txHash: string;
}
const WithdrawTimelineDestop = ({
  containerPosition,
  setSelected,
  handleResize,
  selected
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: WithdrawItem;
  setSelected: (withdraw: WithdrawItem | null) => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const { data, loading } = useFetch<WithdrawDetail>(
    selected.txHash && stakeId && API.STAKE_LIFECYCLE.WITHDRAW_DETAIL(stakeId, selected.txHash)
  );
  const adaHolderRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const boxWalletRef = useRef(null);
  const withdrawnRef = useRef(null);
  const feesRef = useRef(null);
  const feesBrigeRef = useRef(null);
  const netAmountRef = useRef(null);
  const paymentWalletRef = useRef(null);
  const rewardAccountRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [loading]);

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "withdrawal-history"));
  };

  if (loading) {
    return (
      <Box>
        <StepInfo>
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
          <InfoGroup>
            <Info>
              <AddressIcon fill='#438F68' />
              <Box component={Skeleton} ml={1} variant='rectangular' width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant='rectangular' width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant='rectangular' width={130} height={18} />
            </Info>
          </InfoGroup>
        </StepInfo>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </Box>
    );
  }
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
            <InfoText>{formatADA(data?.amount || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(data?.time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={200} height={215}>
            <ADAHolderIcon />
          </Box>
          <Payment ref={boxWalletRef}>
            <Box position={"relative"} ref={paymentWalletRef}>
              <PaymentWallet />
              <RewardWallet>
                <Box component={IconButton} bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)} p={0}>
                  <WalletIconRewardGreen />
                </Box>
                <Box mx={1} fontSize={14}>
                  {formatADA(data?.stakeTotalAmount || 0)}
                </Box>
                <ADAicon />
              </RewardWallet>
            </Box>
            <Box position={"relative"} ref={rewardAccountRef}>
              <RewardWithdraw />
              <RewardAccount>
                <Box component={IconButton} bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)} p={0}>
                  <WalletIconReward />
                </Box>
                <Box mx={1} color={(theme) => theme.palette.common.white} fontSize={14}>
                  {formatADA(data?.stakeRewardAvailable || 0)}
                </Box>
                <ADAicon color={"white"} fontSize={14} />
              </RewardAccount>
            </Box>
          </Payment>
          <RoundBox>
            <PopoverStyled
              render={({ handleClick }) => (
                <NetAmount ref={netAmountRef} width={"max-content"}>
                  <Box>
                    <ADAAmountLabel>
                      {data?.amount && data?.fee ? formatADA(data?.amount - data?.fee) : 0}
                    </ADAAmountLabel>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => netAmountRef?.current && handleClick(netAmountRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </NetAmount>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
            <PopoverStyled
              render={({ handleClick }) => (
                <Withdrawn ref={withdrawnRef} width={"max-content"}>
                  <Box>
                    <ADAAmountLabel>{formatADA(data?.amount || 0)}</ADAAmountLabel>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => withdrawnRef?.current && handleClick(withdrawnRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </Withdrawn>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </RoundBox>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ml={1} ref={feesRef} width={"max-content"}>
                  <Box ref={feesBrigeRef} width={176} height={71} position={"absolute"} top={"-76px"} left={0}></Box>
                  <Box>
                    <Box component={"span"} fontSize={"18px"} fontWeight={"bold"}>
                      {formatADA(data?.fee || 0)}
                    </Box>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => feesRef?.current && handleClick(feesRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </FeeBox>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </Box>

          <Box width={190} height={215} ref={cadarnoSystemRef}>
            <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt='carrdano' />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1"
            }}
          >
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={boxWalletRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={boxWalletRef}
              toRef={withdrawnRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              isCentalVertical={false}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={withdrawnRef}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='border'
              isCentalHorizontal={false}
              orient='vertical'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRef}
              toRef={feesRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              connectToReverse={true}
            />
            <Line
              containerPosition={containerPosition}
              fromRef={feesRef}
              toRef={feesBrigeRef}
              pointTo='center'
              pointFrom='border'
              orient='horizontal'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feesBrigeRef}
              toRef={netAmountRef}
              pointTo='border'
              connectFromReverse={true}
              pointFrom='center'
              connectToReverse={true}
              orient='vertical'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={netAmountRef}
              toRef={boxWalletRef}
              pointTo='border'
              pointFrom='border'
              isCentalHorizontal={false}
              connectToReverse={true}
              connectFromReverse={true}
              orient='vertical'
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};
const WithdrawTimeline = ({
  containerPosition,
  handleResize,
  selected,
  setSelected
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: WithdrawItem;
  setSelected: (withdraw: WithdrawItem | null) => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<WithdrawDetail>(
    selected.txHash && stakeId && API.STAKE_LIFECYCLE.WITHDRAW_DETAIL(stakeId, selected.txHash)
  );
  const adaHolderRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const boxWalletRef = useRef(null);
  const withdrawnRef = useRef(null);
  const feesRef = useRef(null);
  const fake2ref = useRef(null);
  const fake3ref = useRef(null);
  const netAmountRef = useRef(null);
  const paymentWalletRef = useRef(null);
  const rewardAccountRef = useRef(null);
  const history = useHistory();
  const { isMobile, isTablet } = useScreen();

  useEffect(() => {
    handleResize();
  }, [loading]);

  const handleBack = () => {
    history.goBack();
    setSelected(null);
  };

  if (loading) {
    return (
      <Box>
        <StepInfo>
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
          <InfoGroup>
            <Info>
              <AddressIcon fill='#438F68' />
              <Box component={Skeleton} ml={1} variant='rectangular' width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant='rectangular' width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant='rectangular' width={130} height={18} />
            </Info>
          </InfoGroup>
        </StepInfo>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </Box>
    );
  }
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
            <InfoText>{formatADA(data?.amount || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(data?.time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <Box ref={adaHolderRef} mt={5}>
        <ADAHolderIcon />
      </Box>
      <Box margin='0 auto' width={"350px"}>
        <Box mt={5}>
          <Payment>
            <PopoverStyled
              render={({ handleClick }: any) => (
                <Box position={"relative"}>
                  <Box
                    ref={boxWalletRef}
                    position={"absolute"}
                    width={"1px"}
                    height={"-100%"}
                    bottom={"130%"}
                    right={"120px"}
                  ></Box>
                  <PaymentWallet />
                  <RewardWallet>
                    <Box
                      component={IconButton}
                      bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)}
                      p={0}
                      onClick={() => paymentWalletRef?.current && handleClick(paymentWalletRef.current)}
                    >
                      <WalletIconRewardGreen />
                    </Box>
                    <Box mx={1} fontSize={14}>
                      {formatADA(data?.stakeTotalAmount || 0)}
                    </Box>
                    <ADAicon />
                  </RewardWallet>
                </Box>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
            <PopoverStyled
              render={({ handleClick }: any) => (
                <Box position={"relative"} ref={rewardAccountRef}>
                  <RewardWithdraw />
                  <RewardAccount>
                    <Box
                      component={IconButton}
                      bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)}
                      p={0}
                      onClick={() => rewardAccountRef?.current && handleClick(rewardAccountRef.current)}
                    >
                      <WalletIconReward />
                    </Box>
                    <Box mx={1} color={(theme) => theme.palette.common.white} fontSize={14}>
                      {formatADA(data?.stakeRewardAvailable || 0)}
                    </Box>
                    <ADAicon color={"white"} fontSize={14} />
                  </RewardAccount>
                </Box>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </Payment>

          <Box
            display='flex'
            mt={10}
            flexDirection='row-reverse'
            position={"relative"}
            justifyContent={"space-between"}
          >
            <Box ref={fake2ref} width={"250px"} height={300} position={"absolute"} right={"-13%"} bottom={"-10%"}></Box>
            <PopoverStyled
              render={({ handleClick }) => (
                <NetAmount ref={netAmountRef} width={120}>
                  <Box>
                    <ADAAmountLabel>
                      {data?.amount && data?.fee ? formatADA(data?.amount - data?.fee) : 0}
                    </ADAAmountLabel>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => netAmountRef?.current && handleClick(netAmountRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </NetAmount>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
            <Box ref={fake3ref} width={"250px"} height={300} position={"absolute"} right={"40%"} bottom={"-10%"}></Box>
            <PopoverStyled
              render={({ handleClick }) => (
                <Withdrawn ref={withdrawnRef} width={120}>
                  <Box>
                    <ADAAmountLabel>{formatADA(data?.amount || 0)}</ADAAmountLabel>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => withdrawnRef?.current && handleClick(withdrawnRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </Withdrawn>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </Box>

          <Box mt={5} ml={"194px"} width={"150px"}>
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ref={feesRef} width={120}>
                  <Box>
                    <Box component={"span"} fontSize={"18px"} fontWeight={"bold"}>
                      {formatADA(data?.fee || 0)}
                    </Box>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => feesRef?.current && handleClick(feesRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </FeeBox>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </Box>

          <Box margin='0 auto' width={190} height={70} ref={cadarnoSystemRef} mt={5} mb={15}>
            <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt='carrdano' />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: isMobile ? "200vh" : isTablet ? "150vh" : "140vh",
              width: "100vw",
              zIndex: "-1"
            }}
          >
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={boxWalletRef}
              pointTo='center'
              pointFrom='center'
              orient='vertical'
              connectFromReverse
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake3ref}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='center'
              orient='vertical'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2ref}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='center'
              orient='vertical'
              connectToReverse
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};
