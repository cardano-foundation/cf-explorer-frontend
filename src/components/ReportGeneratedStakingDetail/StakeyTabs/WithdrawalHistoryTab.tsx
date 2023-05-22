import { Box } from "@mui/material";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../commons/utils/helper";
import { TableSubTitle, WrapWalletLabel } from "../../TabularView/StakeTab/styles";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";
import { DATETIME_PARTTEN } from "../../StackingFilter/DateRangeModal";
import StackingFilter, { FilterParams } from "../../StackingFilter";
import moment from "moment";
import { GreenWalletIcon } from "../../TabularView/TabularOverview";
import { WrapFilterDescription } from "../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { FilterDateLabel } from "../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";
import { details } from "../../../commons/routers";
import { AdaValue } from "../../TabularView/StakeTab/Tabs/StakeRegistrationTab";

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
    render: (r) => formatDateTimeLocal(r.time)
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
        <AdaValue value={r.value + r.fee} />
        <TableSubTitle>
          <Box display='flex' mt={1} alignItems='center' lineHeight='1'>
            <AdaValue value={r.value} gap='3px' fontSize='12px' />
            <Box mx='3px'>/</Box>
            <AdaValue value={r.fee} gap='3px' fontSize='12px' />
          </Box>
        </TableSubTitle>
      </Box>
    )
  }
];

const WithdrawalHistoryTab = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const fetchData = useFetchList<WithdrawalHistoryItem>(
    reportId ? API.REPORT.SREPORT_DETAIL_WITHDRAWALS(reportId) : "",
    {
      ...pageInfo,
      ...params
    }
  );
  const { total, data } = fetchData;

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <AdaValue value={data.reduce((current, item) => current + item.fee, 0)} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
        </Box>
      </Box>
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
