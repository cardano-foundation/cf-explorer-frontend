/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ReceivedRewardsModal from "src/components/ReceivedRewardsModal";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";

import RewarsDistributionDraw from "./RewardsDistributionDraw";

const RewardsDistribution = () => {
  const [openReceivedRewardsModal, setOpenReceivedRewardsModal] = useState(false);
  const [type, setType] = useState<RECEIVED_REWARDS>(RECEIVED_REWARDS.ALL);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<RewardDistributionStaking>(`${API.STAKE.REWARDS_DISTRIBUTION}/${stakeId}` || "");

  const toggleModal = () => setOpenReceivedRewardsModal((pre) => !pre);
  if (loading) {
    return (
      <Box borderRadius={10} overflow="hidden">
        <Skeleton variant="rectangular" height={300} width="100%" />
      </Box>
    );
  }
  return (
    <Box mt={3}>
      <ReceivedRewardsModal
        reward={data?.rewardAvailable || 0}
        type={type}
        onClose={() => setOpenReceivedRewardsModal(false)}
        open={openReceivedRewardsModal}
      />
      <RewarsDistributionDraw data={data} toggleRewardModal={toggleModal} setTypeRewardModal={setType} />
    </Box>
  );
};
export default RewardsDistribution;
