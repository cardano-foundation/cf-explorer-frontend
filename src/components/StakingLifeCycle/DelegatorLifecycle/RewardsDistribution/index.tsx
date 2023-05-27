import { Box } from "@mui/material";
import { useState } from "react";


import { useParams } from "react-router-dom";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import ReceivedRewardsModal from "../../../ReceivedRewardsModal";
import RewarsDistributionDraw from "./RewardsDistributionDraw";

const RewardsDistribution = () => {
  const [openReceivedRewardsModal, setOpenReceivedRewardsModal] = useState(false);

  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");

  const toggleModal = () => setOpenReceivedRewardsModal((pre) => !pre);

  return (
    <Box>
      <Box mt={3}>
        <ReceivedRewardsModal
          reward={data?.rewardAvailable || 0}
          open={openReceivedRewardsModal}
          onClose={() => setOpenReceivedRewardsModal(false)}
        />
        <RewarsDistributionDraw data={data} toggleRewardModal={toggleModal} />
      </Box>
    </Box>
  );
};
export default RewardsDistribution;
