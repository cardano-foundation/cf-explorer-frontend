import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import Table, { Column } from "src/components/commons/Table";
import { details } from "src/commons/routers";
import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import ADAicon from "src/components/commons/ADAIcon";

import UserInfo from "./UserInfo";
import { Amount, StyledLink } from "./styles";

const RewardActivity: React.FC = () => {
  const { t } = useTranslation();
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number }>({ page: 0, size: 50 });
  const [sort, setSort] = useState<string>("");
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");
  const { isMobile, isGalaxyFoldSmall, isTablet } = useScreen();

  const fetchData = useFetchList<RewardActivityIF>(API.STAKE_LIFECYCLE.REWARDS_ACTIVITY(stakeId), { page, size, sort });
  const rewardType = {
    REWARD_RECEIVED: "Reward received",
    REWARD_WITHDRAWN: "Reward withdrawn"
  };
  const columns: Column<RewardActivityIF>[] = [
    {
      title: t("common.amouintADA"),
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Amount type={r.type === "REWARD_RECEIVED" ? "up" : "down"}>
          {r.amount
            ? r.type === "REWARD_RECEIVED"
              ? `+${formatADAFull(r.amount)}`
              : `-${formatADAFull(r.amount)}`
            : 0}
          <ADAicon />
        </Amount>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "100px",
      render: (r) => formatDateTimeLocal(r.time || ""),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.epoch"),
      key: "Epoch",
      minWidth: "100px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo || 0)}>{r.epochNo}</StyledLink>
    },

    {
      title: t("glossary.txType"),
      key: "transactionCount",
      minWidth: "100px",
      render: (r) => <Box>{rewardType[r.type]}</Box>
    }
  ];
  const maxHeightCalc = `calc(70vh - ${
    isTablet ? "290px" : isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"
  })`;

  return (
    <Box>
      <UserInfo acitve="reward" total={fetchData.total} reward={data?.rewardAvailable || 0} stake={stakeId} />
      <StyledTable
        {...fetchData}
        columns={columns}
        maxHeight={maxHeightCalc}
        total={{ title: t("common.totalEpoch"), count: fetchData.total }}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default RewardActivity;
const StyledTable = styled(Table)(() => ({
  "> :nth-of-type(2)": {
    boxShadow: "none !important"
  }
}));
