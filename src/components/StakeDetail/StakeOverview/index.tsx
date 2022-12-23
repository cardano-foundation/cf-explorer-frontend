import { Box, Skeleton } from "@mui/material";
import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";

import { routers } from "../../../commons/routers";
import delegatedIcon from "../../../commons/resources/icons/delegated.svg";
import totalStakeIcon from "../../../commons/resources/icons/totalStake.svg";
import rewardIcon from "../../../commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "../../../commons/resources/icons/rewardWithdraw.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";

import { formatADA, getShortHash } from "../../../commons/utils/helper";

import CopyButton from "../../commons/CopyButton";
import ProgressCircle from "../../commons/ProgressCircle";

import {
  BackButton,
  BackText,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  LabelStatus,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  ValueCard,
} from "./styles";
import { ADAToken } from "../../commons/Token";

interface IStakeOverview {
  data: IStakeKeyDetail | null;
  loading: boolean;
}

const StakeOverview: React.FC<IStakeOverview> = ({ data, loading }) => {
  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Delegated to </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: data?.pool?.poolName || "",
    },
    {
      icon: totalStakeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Total Stake</TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          {formatADA(data?.totalStake || 0)} <ADAToken />
        </>
      ),
    },
    {
      icon: rewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Reward available </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          {formatADA(data?.rewardAvailable || 0)} <ADAToken />
        </>
      ),
    },
    {
      icon: rewardWithdrawIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Reward withdrawn </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          {formatADA(data?.rewardWithdrawn || 0)} <ADAToken />
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton to={routers.TOKEN_LIST}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Stake Key Details</HeaderTitle>
            {!loading && <Skeleton variant="rectangular" width={"100"} />}
            {!loading && (
              <LabelStatus
                color={props => (data?.status === "ACTIVE" ? props.colorGreenLight : props.textColorPale)}
                style={{
                  background: data?.status === "ACTIVE" ? "rgba(67, 143, 104, 0.2)" : "rgba(102, 112, 133, 0.2)",
                }}
              >
                {data?.status}
              </LabelStatus>
            )}
          </HeaderContainer>
          <SlotLeaderContainer>
            {loading ? (
              <SlotLeaderSkeleton variant="rectangular" />
            ) : (
              <Box>
                <SlotLeader>
                  <Box mr={2}>{data?.stakeAddress}</Box> <CopyButton text={data?.stakeAddress} />
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
        {/* <Box>
          <ProgressCircle percent={80} size={140}>
            <Box>362</Box>
            <Box>Epoch</Box>
          </ProgressCircle>
        </Box> */}
      </Box>

      <CardInfoOverview>
        {listOverview.map((item, idx) => {
          return (
            <CardItem>
              <Box>
                <img src={item.icon} alt="" />
              </Box>
              <Box mt={2} mb={1}>
                {item.title}
              </Box>
              <ValueCard mt={2} mb={1}>
                {item.value}
              </ValueCard>
            </CardItem>
          );
        })}
      </CardInfoOverview>
    </Box>
  );
};

export default StakeOverview;
