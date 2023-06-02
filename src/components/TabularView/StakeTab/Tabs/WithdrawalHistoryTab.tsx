import { Box, useTheme } from "@mui/material";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import { DATETIME_PARTTEN } from "../../../StackingFilter/DateRangeModal";
import { FilterDateLabel } from "../../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";
import { WrapFilterDescription } from "../../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import CustomTooltip from "../../../commons/CustomTooltip";
import Table, { Column } from "../../../commons/Table";
import { StyledLink, TableSubTitle, WrapWalletLabel, WrapperDelegationTab } from "../styles";
import { AdaValue } from "./StakeRegistrationTab";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";

const WithdrawalHistoryTab = () => {
  const detailData = useContext(DelegatorDetailContext);
  const theme = useTheme();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");

  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });

  const columns: Column<WithdrawItem>[] = [
    {
      title: "Transaction Hash",
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Timestamp",
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
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
      render: (r) => (
        <Box>
          <AdaValue limit={5} value={r.value - r.fee} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue limit={1} color={theme.palette.grey[400]} value={r.value} gap="3px" fontSize="12px" />
              <Box mx="3px">/</Box>
              <AdaValue color={theme.palette.grey[400]} value={r.fee} gap="3px" fontSize="12px" />
            </Box>
          </TableSubTitle>
        </Box>
      )
    }
  ];

  const fetchData = useFetchList<WithdrawalHistoryItem>(stakeId ? API.STAKE_LIFECYCLE.WITHDRAW(stakeId) : "", {
    ...pageInfo,
    ...params,
    sort: sort || params?.sort
  });
  const { total, data } = fetchData;

  return (
    <>
      <WrapperDelegationTab>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <Box mr={1}>Rewards withdrawn:</Box>
          <AdaValue value={detailData?.rewardWithdrawn ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>

          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams((pre) => ({
                fromDate: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params,
                sort: params?.sort ? params?.sort.replace("time", "id") : undefined
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
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default WithdrawalHistoryTab;
