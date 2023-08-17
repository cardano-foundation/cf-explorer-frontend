import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import ADAicon from "src/components/commons/ADAIcon";
import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";
import { AdaValue } from "src/components/commons/ADAValue";

import useFetchList from "../../../../commons/hooks/useFetchList";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "../../../../commons/utils/helper";
import CustomFilter, { FilterParams } from "../../../commons/CustomFilter";
import { WrapFilterDescription } from "../../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import Table, { Column } from "../../../commons/Table";
import { AmountADARow, StyledLink, WrapWalletLabel, WrapperDelegationTab } from "../styles";

const RewardsDistributionTab = () => {
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>("");
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [params, setParams] = useState<FilterParams>({});

  const columns: Column<RewardDistributionItem>[] = [
    {
      title: "Rewards Paid",
      key: "paid",
      minWidth: "120px",
      render: (r) => (
        <AmountADARow amount={r.amount}>
          +{formatADAFull(r.amount)} <ADAicon />
        </AmountADARow>
      )
    },
    {
      title: "Created At",
      key: "id",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Epoch",
      key: "epoch",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    }
  ];

  const fetchData = useFetchList<RewardDistributionItem>(stakeId ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) : "", {
    ...pageInfo,
    ...params,
    sort: sort || params.sort
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
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <CustomFilter
            excludes={["search"]}
            searchLabel=""
            sortKey="id"
            filterValue={params}
            onChange={(params) => {
              setParams(params);
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
          />
        </Box>
      </WrapperDelegationTab>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: RewardDistributionItem) => history.push(details.epoch(r.epoch))}
      />
    </>
  );
};

export default RewardsDistributionTab;
