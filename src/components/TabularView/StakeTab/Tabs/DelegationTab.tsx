import { Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import { AdaValue } from "src/components/commons/ADAValue";
import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import { DelegationCertificateModal } from "src/components/StakingLifeCycle/DelegatorLifecycle/Delegation";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";

import { StyledLink, WrapperDelegationTab, WrapWalletLabel } from "../styles";

const DelegationTab = () => {
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const [params, setParams] = useState<FilterParams>({});
  const fetchData = useFetchList<DelegationItem>(stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "", {
    ...pageInfo,
    ...params,
    sort: sort || params.sort
  });

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
      title: "Created At",
      key: "id",
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
      title: "Delegating to",
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <StyledLink to={details.delegation(r.poolId)}>{r.poolName || getShortWallet(r.poolId)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Certificate",
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <IconButton onClick={() => setSelected(r.txHash)}>
          <EyeIcon />
        </IconButton>
      )
    }
  ];

  const { total } = fetchData;

  return (
    <>
      <WrapperDelegationTab>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <Box color={({ palette }) => palette.secondary.light} mr={1}>
            Wallet balance:
          </Box>
          <AdaValue color={({ palette }) => palette.secondary.main} value={detailData?.totalStake ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onChange={(params) => {
              setParams(params);
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel="Search transaction"
          />
        </Box>
      </WrapperDelegationTab>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: DelegationItem) => history.push(details.transaction(r.txHash))}
      />
      <DelegationCertificateModal
        open={!!selected}
        stake={stakeId}
        txHash={selected}
        handleCloseModal={() => setSelected("")}
      />
    </>
  );
};

export default DelegationTab;
