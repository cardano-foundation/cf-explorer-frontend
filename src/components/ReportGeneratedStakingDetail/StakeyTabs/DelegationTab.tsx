import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Box, IconButton } from "@mui/material";

import { details } from "src/commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { FilterParams } from "src/components/commons/CustomFilter";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { EyeIcon } from "src/commons/resources";
import { DelegationCertificateModal } from "src/components/StakingLifeCycle/DelegatorLifecycle/Delegation";

import { AdaValue } from "./StakingRegistrationTab";
import { StakingDetailContext } from "..";

const DelegationTab = () => {
  const [selected, setSelected] = useState<string>("");
  const { stakeKey } = useContext(StakingDetailContext);
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");
  const [params] = useState<FilterParams>({});
  const fetchData = useFetchList<DelegationItem>(reportId ? API.REPORT.SREPORT_DETAIL_DELEGATIONS(reportId) : "", {
    ...pageInfo,
    ...params,
    txHash: params.search,
    sort: sort || params.sort
  });
  const { total } = fetchData;
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
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
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
