import { Box, alpha } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { ADAOrangeIcon } from "../../../../commons/resources";

import Line from "../../../Line";
import { FeeBox, IconButton, RewarWallet } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import { useParams } from "react-router-dom";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import ReceivedRewardsModal from "../../../ReceivedRewardsModal";
import ADAHolderVertical from "../../../../commons/resources/icons/Staking/ADAHolderVertical.svg";
import ADAHolderVerticalMobile from "../../../../commons/resources/icons/Staking/ADAHolderVerticalMobile.svg";
import SPOOpearatorVertical from "../../../../commons/resources/icons/Staking/SPOOpearatorVertical.svg";
import SPOdisnable from "../../../../commons/resources/icons/Staking/SPOdisnable.svg";
import SPOdisnableMobile from "../../../../commons/resources/icons/Staking/SPOdisnableMobile.svg";
import { ReactComponent as ADADisnableIcon } from "../../../../commons/resources/icons/Staking/ADADisnableIcon.svg";
import CardarnoSystemReward from "../../../../commons/resources/icons/Staking/CardarnoSystemReward.svg";
import RewardsAccount from "../../../../commons/resources/icons/Staking/RewardsAccount.svg";
import { ReactComponent as WalletIconReward } from "../../../../commons/resources/icons/Staking/walletIconReward.svg";
import { API } from "../../../../commons/utils/api";
import useFetch from "../../../../commons/hooks/useFetch";
import { formatADA } from "../../../../commons/utils/helper";
import { useScreen } from "../../../../commons/hooks/useScreen";

const RewardsDistribution = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [openReceivedRewardsModal, setOpenReceivedRewardsModal] = useState(false);

  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");

  const cadarnoSystemRef = useRef(null);
  const adaIcon1Ref = useRef(null);
  const adaIcon2Ref = useRef(null);
  const adaHolderRef = useRef(null);
  const operatorRewardRef = useRef(null);
  const feeRef = useRef(null);
  const fee2Ref = useRef(null);

  useEffect(() => {
    handleResize();
  }, [adaIcon1Ref.current, adaIcon2Ref.current, loading]);

  const { isLargeTablet } = useScreen();

  const RewardsDistributionTimeLine = () => {
    return (
      <Box mt={3}>
        <ReceivedRewardsModal
          reward={data?.rewardAvailable || 0}
          open={openReceivedRewardsModal}
          onClose={() => setOpenReceivedRewardsModal(false)}
        />
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box display={"flex"} flex={3} justifyContent={"space-between"}>
            <Box ref={cadarnoSystemRef} width={240} height={300}>
              <img src={CardarnoSystemReward} alt='CardarnoSystemReward' />
            </Box>
            <Box
              py={"50px"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box width={60} height={70} ref={adaIcon1Ref}>
                <ADAOrangeIcon />
              </Box>
              <Box width={60} height={70} ref={adaIcon2Ref}>
                {(data?.rewardPools || []).length === 0 ? <ADADisnableIcon /> : <ADAOrangeIcon />}
              </Box>
            </Box>
            <Box
              display={"flex"}
              pt={"32px"}
              pb={"35px"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} ref={adaHolderRef}>
                <PopoverStyled
                  render={() => (
                    <Box ref={feeRef} width={270} height={100}>
                      <img src={ADAHolderVertical} alt='ADAHolderVertical' />
                    </Box>
                  )}
                  content={<PopupStaking hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
                />
              </Box>
              <Box display={"flex"} ref={operatorRewardRef}>
                <PopoverStyled
                  render={() => (
                    <Box ref={fee2Ref} width={270} height={100}>
                      <img
                        src={(data?.rewardPools || []).length === 0 ? SPOdisnable : SPOOpearatorVertical}
                        alt='SPOOpearatorVertical'
                      />
                    </Box>
                  )}
                  content={<PopupStaking hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
                />
              </Box>
            </Box>
          </Box>
          <Box
            onClick={() => setOpenReceivedRewardsModal(true)}
            flex={1}
            display={"flex"}
            justifyContent={"flex-end"}
            width={225}
            height={266}
          >
            <Box position={"relative"} width={225} height={266}>
              <img style={{ marginLeft: "5px" }} src={RewardsAccount} alt='carrdano' />
              <RewarWallet>
                <Box component={IconButton} bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)} p={0}>
                  <WalletIconReward />
                </Box>
                <Box color={(theme) => theme.palette.common.white} mx={1}>
                  {formatADA(data?.rewardAvailable || 0)}
                </Box>
                <ADAicon color={"white"} />
              </RewarWallet>
            </Box>
          </Box>
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
          <Line
            containerPosition={containerPosition}
            fromRef={cadarnoSystemRef}
            toRef={adaIcon1Ref}
            pointTo='border'
            pointFrom='border'
            orient='vertical'
            isCentalVertical={false}
          />
          <Line
            containerPosition={containerPosition}
            fromRef={cadarnoSystemRef}
            toRef={adaIcon2Ref}
            pointTo='border'
            pointFrom='border'
            isCentalVertical={false}
            orient='vertical'
            dashed={(data?.rewardPools || []).length === 0}
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaIcon1Ref}
            toRef={adaHolderRef}
            pointTo='border'
            pointFrom='border'
            orient='vertical'
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaIcon2Ref}
            toRef={operatorRewardRef}
            pointTo='border'
            pointFrom='border'
            orient='vertical'
            dashed={(data?.rewardPools || []).length === 0}
          />
        </svg>
      </Box>
    );
  };

  const RewardsDistributionTimeLineMobile = () => {
    return (
      <Box mt={3} margin='0 auto' width={"350px"}>
        <ReceivedRewardsModal
          reward={data?.rewardAvailable || 0}
          open={openReceivedRewardsModal}
          onClose={() => setOpenReceivedRewardsModal(false)}
        />
        <Box >
          <Box>
            <Box ref={cadarnoSystemRef}>
              <img src={CardarnoSystemReward} alt='CardarnoSystemReward' />
            </Box>
            <Box display='flex' flexDirection='row-reverse' justifyContent='space-between' mx={5}>
              <Box width={80} height={70} ref={adaIcon1Ref}>
                <ADAOrangeIcon />
              </Box>
              <Box width={80} height={70} ref={adaIcon2Ref}>
                {(data?.rewardPools || []).length === 0 ? <ADADisnableIcon /> : <ADAOrangeIcon />}
              </Box>
            </Box>
            <Box display={"flex"} justifyContent='space-between' flexDirection='row-reverse'>
              <Box display={"flex"} ref={adaHolderRef}>
                <PopoverStyled
                  render={({ handleClick }: any) => (
                    <Box ref={feeRef}>
                      <img src={ADAHolderVerticalMobile} alt='ADAHolderVerticalMobile' />
                    </Box>
                  )}
                  content={<PopupStaking hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
                />
              </Box>
              <Box display={"flex"} ref={operatorRewardRef}>
                <PopoverStyled
                  render={({ handleClick }: any) => (
                    <Box>
                      <img
                        src={(data?.rewardPools || []).length === 0 ? SPOdisnableMobile : SPOOpearatorVertical}
                        alt='SPOOpearatorVertical'
                      />
                    </Box>
                  )}
                  content={<PopupStaking hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
                />
              </Box>
            </Box>
          </Box>
          <Box onClick={() => setOpenReceivedRewardsModal(true)} >
            <Box position={"relative"}>
              <img style={{ marginLeft: "5px" }} src={RewardsAccount} alt='carrdano' />
              <RewarWallet>
                <Box component={IconButton} bgcolor={(theme) => alpha(theme.palette.common.white, 0.1)} p={0}>
                  <WalletIconReward />
                </Box>
                <Box color={(theme) => theme.palette.common.white} mx={1}>
                  {formatADA(data?.rewardAvailable || 0)}
                </Box>
                <ADAicon color={"white"} />
              </RewarWallet>
            </Box>
          </Box>
        </Box>

        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "150vh",
            width: "100vw",
            zIndex: "-1"
          }}
        >
          <Line
            containerPosition={containerPosition}
            fromRef={cadarnoSystemRef}
            toRef={adaIcon1Ref}
            pointTo='center'
            pointFrom='center'
            orient='vertical'
            isCentalHorizontalFrom
          />
          <Line
            containerPosition={containerPosition}
            fromRef={cadarnoSystemRef}
            toRef={adaIcon2Ref}
            pointTo='center'
            pointFrom='center'
            orient='vertical'
            isCentalHorizontalFrom
            dashed
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaIcon2Ref}
            toRef={operatorRewardRef}
            pointTo='center'
            pointFrom='center'
            orient='vertical'
            connectFromReverse
            isCentalHorizontalFrom
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaIcon1Ref}
            toRef={feeRef}
            pointTo='center'
            pointFrom='center'
            orient='vertical'
          />
        </svg>
      </Box>
    );
  };

  return <Box>{isLargeTablet ? RewardsDistributionTimeLineMobile() : RewardsDistributionTimeLine()}</Box>;
};
export default RewardsDistribution;
