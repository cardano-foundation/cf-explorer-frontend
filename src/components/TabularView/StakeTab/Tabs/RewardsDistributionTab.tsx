import { Box } from "@mui/material";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "../../../../commons/utils/helper";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import { DATETIME_PARTTEN } from "../../../StackingFilter/DateRangeModal";
import { FilterDateLabel } from "../../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";
import { WrapFilterDescription } from "../../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import Table, { Column } from "../../../commons/Table";
import { GreenWalletIcon } from "~/components/commons/GreenWalletIcon";
import { AmountADARow, StyledLink, WrapWalletLabel, WrapperDelegationTab } from "../styles";
import { AdaValue } from "./StakeRegistrationTab";
import ADAicon from "~/components/commons/ADAIcon";

const RewardsDistributionTab = () => {
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>("");
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });

  const columns: Column<RewardDistributionItem>[] = [
    {
      title: "Rewards Paid",
      key: "paid",
      minWidth: "120px",
      render: (r) => (<AmountADARow>
        +{formatADAFull(r.amount)} <ADAicon color='#333333' />
      </AmountADARow>)
    },
    {
      title: "Timestamp",
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
    sort
  });
  const { total, data } = fetchData;
  const filterLabel = useMemo(() => {
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);
  return (
    <>
      <WrapperDelegationTab>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <Box mr={1}>Reward account:</Box>
          <AdaValue value={detailData?.rewardAvailable ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams((pre) => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              }));
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
