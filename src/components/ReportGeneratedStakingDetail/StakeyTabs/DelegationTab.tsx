import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import { details } from "src/commons/routers";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { EyeIcon } from "src/commons/resources";
import { DelegationCertificateModal } from "src/components/StakingLifeCycle/DelegatorLifecycle/Delegation";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";

import { AdaValue } from "./StakingRegistrationTab";
import { StakingDetailContext } from "..";

const DelegationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selected, setSelected] = useState<string>("");
  const { stakeKey } = useContext(StakingDetailContext);
  const { reportId } = useParams<{ reportId: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const fetchData = useFetchList<DelegationItem>(reportId ? API.REPORT.SREPORT_DETAIL_DELEGATIONS(reportId) : "", {
    ...pageInfo
  });

  const { total } = fetchData;
  const columns: Column<DelegationItem>[] = [
    {
      title: t("glossary.transactionHash"),
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("common.fees"),
      key: "block",
      minWidth: "120px",
      render: (r) => <AdaValue value={r.fee} />
    },
    {
      title: t("common.delegationTo"),
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.poolName || getShortHash(r.poolId)}>
          <StyledLink to={details.delegation(r.poolId)}>{r.poolName || getShortHash(r.poolId)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("common.certificate"),
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <IconButton onClick={() => setSelected(r.txHash)}>
          <CustomIcon icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
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
        total={{ title: t("common.total"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
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
