import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ReceivedRewardsModal, { ReceivedRewardsType } from "src/components/ReceivedRewardsModal";

import RewarsDistributionDraw from "./RewardsDistributionDraw";

const RewardsDistribution = () => {
  const [openReceivedRewardsModal, setOpenReceivedRewardsModal] = useState(false);
  const [type, setType] = useState<ReceivedRewardsType>(ReceivedRewardsType.ALL);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");

  const toggleModal = () => setOpenReceivedRewardsModal((pre) => !pre);
  return (
    <Box>
      <Box mt={3}>
        {openReceivedRewardsModal && <ReceivedRewardsModal
          reward={data?.rewardAvailable || 0}
          type={type}
          onClose={() => setOpenReceivedRewardsModal(false)}
        />}
        <RewarsDistributionDraw data={data} toggleRewardModal={toggleModal} setTypeRewardModal={setType} />
      </Box>
    </Box>
  );
};
export default RewardsDistribution;
