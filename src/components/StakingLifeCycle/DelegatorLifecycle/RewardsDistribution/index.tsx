import { Box } from "@mui/material";
import { useRef } from "react";

import { ADAOrangeIcon } from "../../../../commons/resources";
import { ReactComponent as CadarnoSystemRewardis } from "../../../../commons/resources/icons/Staking/cadarnoSystemRewardis.svg";
import AdaHolderLong from "../../../../commons/resources/icons/Staking/AdaHolderLong.svg";
import orapetorReward from "../../../../commons/resources/icons/Staking/orapetorReward.svg";
import rewardAccount from "../../../../commons/resources/icons/Staking/RewardAccount.svg";
import walletIcon from "../../../../commons/resources/icons/Staking/WalletIcon.svg";

import Line from "../../../Line";
import { Price, WalletBox, WalletButton } from "./styles";
import ArrowDiagram from "../../../ArrowDiagram";
import ADAicon from "../../../commons/ADAIcon";

const RewardsDistribution = ({
  containerPosition,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
}) => {
  const cadarnoSystemRef = useRef(null);
  const adaIcon1Ref = useRef(null);
  const adaIcon2Ref = useRef(null);
  const adaHolderRef = useRef(null);
  const operatorRewardRef = useRef(null);

  return (
    <Box mt={3}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
        <Box display={"flex"} flex={3} justifyContent={"space-between"}>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box ref={cadarnoSystemRef}>
              <CadarnoSystemRewardis />
            </Box>
            <Box
              py={3}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box ref={adaIcon1Ref} width={60} height={70}>
                <ADAOrangeIcon />
              </Box>
              <Box ref={adaIcon2Ref} width={60} height={70}>
                <ADAOrangeIcon />
              </Box>
            </Box>
            <Box
              display={"flex"}
              pt={"6px"}
              pb={1}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box ref={adaHolderRef} width={270} height={105}>
                <img src={AdaHolderLong} alt="ada holder img" />
              </Box>
              <Box ref={operatorRewardRef} width={270} height={100}>
                <img src={orapetorReward} alt="orapetorReward" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={1} textAlign={"end"}>
          <Box component={"span"} display={"inline-block"} position={"relative"} width={225} height={270}>
            <img src={rewardAccount} alt="rewardAccount" />
            <WalletBox>
              <WalletButton>
                <img src={walletIcon} alt="walletIcon" />
              </WalletButton>
              <Price>
                10,000.0 <ADAicon ml={1} />
              </Price>
            </WalletBox>
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
          zIndex: "-1",
        }}
      >
        <Line
          containerPosition={containerPosition}
          fromRef={cadarnoSystemRef}
          toRef={adaIcon1Ref}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
          isCentalVertical={false}
        />
        <Line
          containerPosition={containerPosition}
          fromRef={cadarnoSystemRef}
          toRef={adaIcon2Ref}
          pointTo="border"
          pointFrom="border"
          isCentalVertical={false}
          orient="vertical"
        />
        <ArrowDiagram
          containerPosition={containerPosition}
          fromRef={adaIcon1Ref}
          toRef={adaHolderRef}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
        />
        <ArrowDiagram
          containerPosition={containerPosition}
          fromRef={adaIcon2Ref}
          toRef={operatorRewardRef}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
        />
      </svg>
    </Box>
  );
};
export default RewardsDistribution;
