/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";
import ReceivedRewardsModal from "src/components/ReceivedRewardsModal";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

import RewarsDistributionDraw from "./RewardsDistributionDraw";
import { DrawingContainer } from "./styles";

const RewardsDistribution = () => {
  const [openReceivedRewardsModal, setOpenReceivedRewardsModal] = useState(false);
  const [type, setType] = useState<RECEIVED_REWARDS>(RECEIVED_REWARDS.ALL);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<RewardDistributionStaking>(`${API.STAKE.REWARDS_DISTRIBUTION}/${stakeId}` || "");

  const toggleModal = () => setOpenReceivedRewardsModal((pre) => !pre);
  if (loading) {
    return (
      <Box borderRadius={10} overflow="hidden">
        <CommonSkeleton variant="rectangular" height={300} width="100%" />
      </Box>
    );
  }
  return (
    <Box mt={3}>
      <ReceivedRewardsModal
        reward={data?.rewardAvailable || 0}
        type={type}
        onClose={() => {
          setOpenReceivedRewardsModal(false);
          setType(RECEIVED_REWARDS.ALL);
        }}
        open={openReceivedRewardsModal}
      />
      <DrawingContainer>
        <RewarsDistributionDraw data={data} toggleRewardModal={toggleModal} setTypeRewardModal={setType} />
      </DrawingContainer>
    </Box>
  );
};
export default RewardsDistribution;
