import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import Table, { Column } from "../../commons/Table";
import { Status, TextAmountReward } from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal/styles";
import CustomIcon from "../../commons/CustomIcon";
import { AIconGreen } from "../../../commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash, limitString } from "../../../commons/utils/helper";
import { StyledLink } from "../../share/styled";
import { details } from "../../../commons/routers";
import { styled } from "@mui/material";
import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";
import { useLocation, useParams } from "react-router-dom";
import { ReportGeneratedPoolDetailContext } from "..";

const trxType = {
  SENT: "ADA sent from wallet",
  RECEIVED: "ADA received from wallet",
  FEE_PAID: "Transaction fee paid",
  CERTIFICATE_FEE_PAID: "Certificate fee paid",
  CERTIFICATE_DEPOSIT_PAID: "Certificate deposit paid",
};

const PoolSizeTab = () => {
    const { reportName } = useContext<{ reportName: string }>(ReportGeneratedPoolDetailContext);
  const [sort, setSort] = useState<string>("");
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 });
  const fetchData = useFetchList<any>(API.REPORT.PREPORT_EPOCH_SIZE(reportId), {
    ...pageInfo,
    sort,
  });
  const columns: Column<any>[] = [
    {
      title: "Pool size",
      key: "size",
      minWidth: "100px",
      render: r => (
        <Box display="flex" alignItems="center">
          <TextAmountReward>{formatADAFull(r.epoch)}</TextAmountReward>
          <CustomIcon icon={AIconGreen} height={15} fill="currentColor" color={theme => theme.palette.text.primary} />
        </Box>
      ),
    },
    {
      title: "Transaction Type",
      key: "epoch",
      minWidth: "150px",
      render: r => <StyledLink to={''}>{r.epoch}</StyledLink>,
    },
  ];
  return (
    <Box mt={2}>
      <StyledTable
        {...fetchData}
        tableTitle={limitString(reportName, 80)}
        columns={columns}
        total={{ title: "Total Epochs", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo({ page: page - 1, size }),
        }}
      />
    </Box>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-child(2)": {
    boxShadow: "none !important",
  },
}));

export default PoolSizeTab;