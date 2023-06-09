import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { details } from "src/commons/routers";
import { formatDateTimeLocal, getPageInfo } from "src/commons/utils/helper";
import { AdaValue } from "src/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import useFetchList from "src/commons/hooks/useFetchList";
import { FilterParams } from "src/components/StackingFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { API } from "src/commons/utils/api";


const RewardsDistributionTab = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");
  const [params] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const fetchData = useFetchList<RewardDistributionItem>(reportId ? API.REPORT.SREPORT_DETAIL_REWARDS(reportId) : "", {
    ...pageInfo,
    ...params,
    sort: sort || params.sort
  });
  const { total } = fetchData;
  const columns: Column<RewardDistributionItem>[] = [
    {
      title: "Rewards Paid",
      key: "paid",
      minWidth: "120px",
      render: (r) => <AdaValue value={r.amount} />
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
      title: "Epoch",
      key: "epoch",
      minWidth: "120px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
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
        onClickRow={(e, r: RewardDistributionItem) => history.push(details.epoch(r.epoch))}
      />
    </>
  );
};

export default RewardsDistributionTab;
