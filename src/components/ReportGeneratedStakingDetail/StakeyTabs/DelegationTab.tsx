import { useHistory, useLocation, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";
import { AdaValue } from "./StakingRegistrationTab";
import { useContext, useMemo, useState } from "react";
import StackingFilter, { FilterParams } from "../../StackingFilter";
import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";
import moment from "moment";
import { DATETIME_PARTTEN } from "../../StackingFilter/DateRangeModal";
import { Box, IconButton } from "@mui/material";
import { WrapWalletLabel } from "../../TabularView/StakeTab/styles";
import { GreenWalletIcon } from "../../TabularView/TabularOverview";
import { WrapFilterDescription } from "../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { FilterDateLabel } from "../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles";
import { EyeIcon } from "../../../commons/resources";
import { DelegationCertificateModal } from "../../StakingLifeCycle/DelegatorLifecycle/Delegation";
import { StakingDetailContext } from "..";

const DelegationTab = () => {
  const [selected, setSelected] = useState<string>("");
  const { stakeKey } = useContext(StakingDetailContext);
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
  const fetchData = useFetchList<DelegationItem>(reportId ? API.REPORT.SREPORT_DETAIL_DELEGATIONS(reportId) : "", {
    ...pageInfo,
    ...params
  });
  const { total, data } = fetchData;
  const columns: Column<DelegationItem>[] = [
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
      title: "Fees",
      key: "block",
      minWidth: "120px",
      render: (r) => <AdaValue value={r.fee} />
    },
    {
      title: "Certificate",
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <IconButton onClick={() => setSelected(r.txHash)}>
          <EyeIcon style={{ transform: "scale(.8)" }} />
        </IconButton>
      )
    }
  ];
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' mt={4}>
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
          page: pageInfo.page + 1,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: DelegationItem) => history.push(details.transaction(r.txHash))}
      />
      <DelegationCertificateModal
        open={!!selected}
        stake={stakeKey}
        txHash={selected}
        handleCloseModal={() => setSelected("")}
      />
    </>
  );
};

export default DelegationTab;
