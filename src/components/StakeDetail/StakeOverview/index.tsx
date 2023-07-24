import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import delegatedIcon from "src/commons/resources/icons/delegated.svg";
import rewardIcon from "src/commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "src/commons/resources/icons/rewardWithdraw.svg";
import totalStakeIcon from "src/commons/resources/icons/totalStake.svg";
import { details } from "src/commons/routers";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailHeader from "src/components/commons/DetailHeader";

import ModalAllAddress from "../ModalAllAddress";
import { ButtonModal, StyledFlexValue, StyledLinkTo, TitleCard, TitleNoPool, TitleValue } from "./styles";

interface Props {
  data: IStakeKeyDetail | null;
  loading: boolean;
  lastUpdated: number;
}
const StakeOverview: React.FC<Props> = ({ data, loading, lastUpdated }) => {
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();

  const poolName = data?.pool?.poolName || "";
  const tickerName = data?.pool?.tickerName || "";
  const poolId = data?.pool?.poolId || "";
  const hasTicketOrPoolName = tickerName || poolName;

  const delegateTooltip = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : poolId
    : "Not delegated to any pool";

  const delegateTo = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : getShortWallet(poolId)
    : "Not delegated to any pool";
  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Delegated to </TitleCard>
        </Box>
      ),
      value: (
        <CustomTooltip sx={{ width: "unset" }} title={delegateTooltip}>
          <StyledLinkTo isTo={!!data?.pool} to={data?.pool?.poolId ? details.delegation(data?.pool?.poolId) : "#"}>
            {!hasTicketOrPoolName ? <TitleNoPool>{delegateTo}</TitleNoPool> : <TitleValue>{delegateTo}</TitleValue>}
          </StyledLinkTo>
        </CustomTooltip>
      )
    },
    {
      icon: totalStakeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Total Stake</TitleCard>
        </Box>
      ),
      value: (
        <Box>
          <StyledFlexValue>
            <Box component={"span"}>{formatADAFull(data?.totalStake)}</Box>
            <ADAicon />
          </StyledFlexValue>
          <Box sx={{ color: "blue" }}>
            <ButtonModal onClick={() => setOpen(true)}>View all addresses</ButtonModal>
          </Box>
          <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
        </Box>
      )
    },
    {
      icon: rewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Rewards available </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          <Box component={"span"}>{formatADAFull(data?.rewardAvailable)}</Box>
          <ADAicon />
        </StyledFlexValue>
      )
    },
    {
      icon: rewardWithdrawIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Rewards withdrawn </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          {formatADAFull(data?.rewardWithdrawn)}
          <ADAicon />
        </StyledFlexValue>
      )
    }
  ];

  return (
    <DetailHeader
      type="STAKE_KEY"
      bookmarkData={data?.stakeAddress || ""}
      title="Stake Address Details"
      hash={data?.stakeAddress}
      stakeKeyStatus={data?.status}
      listItem={listOverview}
      loading={loading}
      lastUpdated={lastUpdated}
    />
  );
};

export default StakeOverview;
