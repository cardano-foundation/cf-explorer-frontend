import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { omit } from "lodash";

import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import { AdaValue } from "src/components/commons/ADAValue";
import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import { DelegationCertificateModal } from "src/components/StakingLifeCycle/DelegatorLifecycle/Delegation";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { StyledLink, WrapperDelegationTab, WrapWalletLabel } from "../styles";

const DelegationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const [selected, setSelected] = useState<string>("");
  const [params, setParams] = useState<FilterParams>({});

  const fetchData = useFetchList<DelegationItem>(stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "", {
    ...pageInfo,
    ...params,
    txHash: params.search
  });

  const columns: Column<DelegationItem>[] = [
    {
      title: t("glossary.txHash"),
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
      key: "id",
      minWidth: "120px",
      render: (r) => <DatetimeTypeTooltip>{formatDateTimeLocal(r.time)}</DatetimeTypeTooltip>,
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
      title: t("slc.delegatingTo"),
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
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
          <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
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
            {t("common.walletBalance")}:
          </Box>
          <AdaValue color={({ palette }) => palette.secondary.main} value={detailData?.totalStake ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            {t("common.showing")} {Math.min(total, pageInfo.size)}{" "}
            {Math.min(total, pageInfo.size) <= 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onSubmit={(params) => {
              if (params) {
                setParams(params);
              }
              const newParams = omit({ ...params, txHash: params?.search }, ["search"]);
              history.replace({ search: stringify({ page: 1, ...newParams }) });
            }}
            searchLabel={t("common.searchTx")}
          />
        </Box>
      </WrapperDelegationTab>
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
        stake={stakeId}
        txHash={selected}
        handleCloseModal={() => setSelected("")}
      />
    </>
  );
};

export default DelegationTab;
