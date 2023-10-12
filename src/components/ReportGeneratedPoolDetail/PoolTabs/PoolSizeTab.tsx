import { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Table, { Column } from "src/components/commons/Table";
import { TextAmountReward } from "src/components/StakingLifeCycle/DelegatorLifecycle/ADATransferModal/styles";
import { formatADAFull } from "src/commons/utils/helper";
import { StyledLink } from "src/components/share/styled";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import ADAicon from "src/components/commons/ADAIcon";
import { IPoolReportList } from "src/types/report";

const PoolSizeTab = () => {
  const { t } = useTranslation();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const { loading, ...fetchData } = useFetchList<IReportEpochSize>(API.REPORT.PREPORT_EPOCH_SIZE(reportId), {
    ...pageInfo
  });
  const { data: dataReportDetail, loading: loadingDetail } = useFetch<IPoolReportList>(
    API.REPORT.POOL_REPORTED_DETAIL(reportId)
  );

  const columns: Column<IReportEpochSize>[] = [
    {
      title: t("glossary.poolSize"),
      key: "size",
      minWidth: "100px",
      render: (r) => (
        <Box display="flex" alignItems="center">
          <TextAmountReward>{formatADAFull(r.size || 0)}</TextAmountReward>
          <ADAicon data-testid="poolsize-ada-icon" />
        </Box>
      )
    },
    {
      title: t("common.feesPaid"),
      key: "fees",
      minWidth: "140px",
      render: (r) => (
        <Box display="flex" alignItems="center">
          <TextAmountReward>{formatADAFull(r.fee)}</TextAmountReward>
          <ADAicon />
        </Box>
      )
    },
    {
      title: t("epoch"),
      key: "epoch",
      minWidth: "70px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    }
  ];
  const [columnsTable, setColumnsTable] = useState(columns);

  useEffect(() => {
    if (dataReportDetail && dataReportDetail.isFeesPaid === false) {
      setColumnsTable((columns) => columns.filter((c) => c.key !== "fees"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataReportDetail)]);

  return (
    <Box>
      <StyledTable
        {...fetchData}
        columns={columnsTable}
        loading={loading || loadingDetail}
        total={{ title: t("common.totalEpoch"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-of-type(2)": {
    boxShadow: "none !important"
  }
}));

export default PoolSizeTab;
