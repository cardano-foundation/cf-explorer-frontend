import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { FilterParams } from "src/components/commons/CustomFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";

const WithdrawalHistoryTab = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");
  const [params] = useState<FilterParams>({});
  const fetchData = useFetchList<WithdrawalHistoryItem>(
    reportId ? API.REPORT.SREPORT_DETAIL_WITHDRAWALS(reportId) : "",
    {
      ...pageInfo,
      ...params,
      txHash: params.search,
      sort: sort || params.sort
    }
  );
  const { total } = fetchData;
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
      title: "Created At",
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
