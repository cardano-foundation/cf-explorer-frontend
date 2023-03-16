import { useState } from "react";
import { Box } from "@mui/material";
import { details } from "../../../commons/routers";
import delegatedIcon from "../../../commons/resources/icons/delegated.svg";
import totalStakeIcon from "../../../commons/resources/icons/totalStake.svg";
import rewardIcon from "../../../commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "../../../commons/resources/icons/rewardWithdraw.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import { formatADAFull } from "../../../commons/utils/helper";
import {
  ButtonModal,
  StyledFlexValue,
  StyledLink,
  TitleCard,
} from "./styles";
import { ADAToken } from "../../commons/Token";
import { useParams } from "react-router-dom";
import ModalAllAddress from "../ModalAllAddress";
import CustomTooltip from "../../commons/CustomTooltip";
import DetailHeader from "../../commons/DetailHeader";

interface Props {
  data: IStakeKeyDetail | null;
  loading: boolean;
}
const StakeOverview: React.FC<Props> = ({ data, loading }) => {
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Delegated to </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <CustomTooltip title={`${data?.pool?.tickerName || ""} - ${data?.pool?.poolName || ""}`}>
          <StyledLink to={details.delegation(data?.pool?.poolId)}>
            {data?.pool?.tickerName || ""} - {data?.pool?.poolName || ""}
          </StyledLink>
        </CustomTooltip>
      ),
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
        <Box>
          <StyledFlexValue>
            <Box component={"span"}>{formatADAFull(data?.totalStake)}</Box>
            <ADAToken />
          </StyledFlexValue>
          <Box>
            <ButtonModal onClick={() => setOpen(true)}>View all addresses</ButtonModal>
          </Box>
          <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
        </Box>
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
        <StyledFlexValue>
          <Box component={"span"}>{formatADAFull(data?.rewardAvailable)}</Box>
          <ADAToken />
        </StyledFlexValue>
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
        <StyledFlexValue>
          {formatADAFull(data?.rewardWithdrawn)}
          <ADAToken />
        </StyledFlexValue>
      ),
    },
  ];

  return (
    <DetailHeader
      type="STAKE_KEY"
      bookmarkData={data?.stakeAddress || ""}
      title="Stake Key Details"
      hash={data?.stakeAddress}
      stakeKeyStatus={data?.status}
      listItem={listOverview}
      loading={loading}
    />
  );
};

export default StakeOverview;
