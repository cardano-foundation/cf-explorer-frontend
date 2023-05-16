import { Box, styled } from "@mui/material";
import { useState, useEffect } from "react";
import Table, { Column } from "../../commons/Table";
import { TextAmountReward } from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal/styles";
import CustomIcon from "../../commons/CustomIcon";
import { AIconGreen } from "../../../commons/resources";
import { formatADAFull } from "../../../commons/utils/helper";
import { StyledLink } from "../../share/styled";

import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";
import { useParams } from "react-router-dom";
import useFetch from "~/commons/hooks/useFetch";
import { useUpdateEffect } from "react-use";
import { details } from "~/commons/routers";

const PoolSizeTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 });
  const { loading, ...fetchData } = useFetchList<any>(API.REPORT.PREPORT_EPOCH_SIZE(reportId), {
    ...pageInfo
  });
  const { data: dataReportDetail, loading: loadingDetail } = useFetch<IPoolReportList>(
    API.REPORT.POOL_REPORTED_DETAIL(reportId)
  );

  const columns: Column<any>[] = [
    {
      title: "Pool size",
      key: "size",
      minWidth: "100px",
      render: (r) => (
        <Box display='flex' alignItems='center'>
          <TextAmountReward>{formatADAFull(r.size || 0)}</TextAmountReward>
          <CustomIcon icon={AIconGreen} height={15} fill='currentColor' color={(theme) => theme.palette.text.primary} />
        </Box>
      )
    },
    {
      title: "Fees paid",
      key: "fees",
      minWidth: "100px",
      render: (r) => (
        <Box display='flex' alignItems='center'>
          <TextAmountReward>{formatADAFull(r.fee)}</TextAmountReward>
          <CustomIcon icon={AIconGreen} height={15} fill='currentColor' color={(theme) => theme.palette.text.primary} />
        </Box>
      )
    },
    {
      title: "Epoch",
      key: "epoch",
      minWidth: "150px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    }
  ];
  const [columnsTable, setColumnsTable] = useState(columns);

  useEffect(() => {
    if (dataReportDetail && dataReportDetail.isFeesPaid === false) {
      setColumnsTable((columns) => columns.filter((c) => c.key !== "fees"));
    }
  }, [JSON.stringify(dataReportDetail)]);

  return (
    <Box>
      <StyledTable
        {...fetchData}
        columns={columnsTable}
        loading={loading || loadingDetail}
        total={{ title: "Total Epochs", count: fetchData.total }}
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
  "> :nth-child(2)": {
    boxShadow: "none !important"
  }
}));

export default PoolSizeTab;
