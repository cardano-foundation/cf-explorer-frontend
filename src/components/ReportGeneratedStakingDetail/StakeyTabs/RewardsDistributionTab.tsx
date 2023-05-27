import { useHistory, useLocation, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";
import { formatDateTimeLocal, getPageInfo } from "../../../commons/utils/helper";
import { AdaValue } from "../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";
import { useMemo, useState } from "react";
import useFetchList from "../../../commons/hooks/useFetchList";
import StackingFilter, { FilterParams } from "../../StackingFilter";
import moment from "moment";
import { DATETIME_PARTTEN } from "../../StackingFilter/DateRangeModal";
import { Box } from "@mui/material";
import { WrapWalletLabel } from "../../TabularView/StakeTab/styles";
import { GreenWalletIcon } from "../../TabularView/TabularOverview";
import { WrapFilterDescription } from "../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { FilterDateLabel } from "../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";
import { API } from "../../../commons/utils/api";

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
    render: (r) => formatDateTimeLocal(r.time)
  },
  {
    title: "Epoch",
    key: "epoch",
    minWidth: "120px",
    render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
  }
];

const RewardsDistributionTab = () => {
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
  const fetchData = useFetchList<RewardDistributionItem>(reportId ? API.REPORT.SREPORT_DETAIL_REWARDS(reportId) : "", {
    ...pageInfo,
    ...params
  });
  const { total, data } = fetchData;

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
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
