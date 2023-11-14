import { Box } from "@mui/material";
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { omit } from "lodash";

import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import ADAicon from "src/components/commons/ADAIcon";
import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";
import { AdaValue } from "src/components/commons/ADAValue";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import CustomFilter from "src/components/commons/CustomFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import Table, { Column } from "src/components/commons/Table";
import usePageInfo from "src/commons/hooks/usePageInfo";

import { AmountADARow, StyledLink, WrapWalletLabel, WrapperDelegationTab } from "../styles";

const RewardsDistributionTab = () => {
  const { t } = useTranslation();
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const columns: Column<RewardDistributionItem>[] = [
    {
      title: t("common.rewardsPaid"),
      key: "paid",
      minWidth: "120px",
      render: (r) => (
        <AmountADARow amount={r.amount}>
          +{formatADAFull(r.amount)} <ADAicon />
        </AmountADARow>
      )
    },
    {
      title: t("createdAt"),
      key: "id",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.epoch"),
      key: "epoch",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    }
  ];

  const fetchData = useFetchList<RewardDistributionItem>(stakeId ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) : "", {
    ...pageInfo
  });
  const { total } = fetchData;
  return (
    <>
      <WrapperDelegationTab>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <Box mr={1}>Reward account:</Box>
          <AdaValue color={({ palette }) => palette.secondary.main} value={detailData?.rewardAvailable ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            {t("common.showing")} {Math.min(total, pageInfo.size)}{" "}
            {Math.min(total, pageInfo.size) <= 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
          <CustomFilter
            excludes={["search"]}
            searchLabel=""
            sortKey="id"
            filterValue={omit(pageInfo, ["page", "size"])}
            onChange={(params) => history.replace({ search: stringify({ ...pageInfo, page: 0, ...params }) })}
          />
        </Box>
      </WrapperDelegationTab>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("common.total"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          }
        }}
        onClickRow={(e, r: RewardDistributionItem) => history.push(details.epoch(r.epoch))}
      />
    </>
  );
};

export default RewardsDistributionTab;
