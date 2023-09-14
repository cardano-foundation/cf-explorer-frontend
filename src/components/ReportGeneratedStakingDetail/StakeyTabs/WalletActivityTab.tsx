import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Table, { Column } from "src/components/commons/Table";
import { Amount, Status } from "src/components/StakingLifeCycle/DelegatorLifecycle/ADATransferModal/styles";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { StyledLink } from "src/components/share/styled";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

const WalletActitityTab = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState<string>("");
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const fetchData = useFetchList<WalletActivityIF>(API.REPORT.SREPORT_WALLET_ACTIVITY(reportId), {
    ...pageInfo,
    sort
  });
  const columns: Column<IADATransferReport>[] = [
    {
      title: t("common.amouintADA"),
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Box display="flex" alignItems="center">
          <Amount type={r.amount > 0 ? "up" : "down"}>
            {r.amount > 0 ? "+" : ""}
            {formatADAFull(r.amount)}
            <ADAicon />
          </Amount>
        </Box>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "100px",
      render: (r) => formatDateTimeLocal(r.time || ""),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.txHash"),
      key: "transactionHash",
      minWidth: "100px",
      render: (r) => (
        <StyledLink to={details.transaction(r.txHash || "")}>
          <CustomTooltip title={r.txHash}>
            <Box component={"span"}>{getShortHash(r.txHash)}</Box>
          </CustomTooltip>
        </StyledLink>
      )
    },
    {
      title: t("common.status"),
      key: "status",
      minWidth: "150px",
      render: (r) => <Status status={r.status}>{r.status}</Status>
    }
  ];
  return (
    <Box mt={2}>
      <StyledTable
        {...fetchData}
        tableTitle=""
        columns={columns}
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

export default WalletActitityTab;
