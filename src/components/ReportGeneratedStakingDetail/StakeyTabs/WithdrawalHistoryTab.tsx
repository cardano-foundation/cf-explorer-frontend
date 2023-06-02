import { useState } from "react";
import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { FilterParams } from "src/components/StackingFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { details } from "src/commons/routers";
import { AdaValue } from "src/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";

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
          <Box display="flex" mt={1} alignItems="center" lineHeight="1">
            <AdaValue value={r.value} gap="3px" fontSize="12px" />
            <Box mx="3px">/</Box>
            <AdaValue value={r.fee} gap="3px" fontSize="12px" />
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
  const [params] = useState<FilterParams>({
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
  const { total } = fetchData;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
        <Box />
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
