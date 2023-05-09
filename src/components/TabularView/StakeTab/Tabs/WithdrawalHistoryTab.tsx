import { Box } from "@mui/material";
import { StyledLink, TableSubTitle, WrapWalletLabel } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { AdaValue } from "./StakeRegistrationTab";
import { GreenWalletIcon } from "../../TabularOverview";
import CustomTooltip from "../../../commons/CustomTooltip";
import { useMemo, useState } from "react";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import moment from "moment";
import { DATETIME_PARTTEN } from "../../../StackingFilter/DateRangeModal";
import { WrapFilterDescription } from "../../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { FilterDateLabel } from "../../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";

const WithdrawalHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");

  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined,
  });

  const columns: Column<WithdrawItem>[] = [
    {
      title: "Transaction Hash",
      key: "hash",
      minWidth: "120px",
      render: r => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      ),
    },
    {
      title: "Timestamp",
      key: "time",
      minWidth: "120px",
      render: r => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: (
        <>
          <Box>Net Amount</Box>
          <TableSubTitle>Withdrawn/Fees</TableSubTitle>
        </>
      ),
      key: "epoch",
      minWidth: "120px",
      render: r => (
        <Box>
          <AdaValue value={r.value + r.fee} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue value={r.value} gap="3px" fontSize="12px" />
              <Box mx="3px">/</Box>
              <AdaValue value={r.fee} gap="3px" fontSize="12px" />
            </Box>
          </TableSubTitle>
        </Box>
      ),
    },
  ];

  const fetchData = useFetchList<WithdrawalHistoryItem>(stakeId ? API.STAKE_LIFECYCLE.WITHDRAW(stakeId) : "", {
    ...pageInfo,
    ...params,
    sort,
  });
  const { total, data } = fetchData;
  const filterLabel = useMemo(() => {
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params.sort && params.sort.length >= 2)
      return `${params.sort[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <AdaValue value={data.reduce((current, item) => current + item.fee, 0)} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={params => {
              setParams(pre => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params,
              }));
              setPageInfo(pre => ({ ...pre, page: 0 }));
            }}
          />
        </Box>
      </Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo(pre => ({ ...pre, page, size })),
        }}
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default WithdrawalHistoryTab;
