import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import Table, { Column } from "src/components/commons/Table";
import { Amount, Status } from "src/components/StakingLifeCycle/DelegatorLifecycle/ADATransferModal/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import { ADAsigntIC, AIconGreen } from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { StyledLink } from "src/components/share/styled";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { ADAValueLabel } from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";

const trxType = {
  SENT: "ADA sent from wallet",
  RECEIVED: "ADA received",
  FEE_PAID: "Transaction fee paid",
  CERTIFICATE_FEE_PAID: "Certificate fee paid",
  CERTIFICATE_DEPOSIT_PAID: "Certificate deposit paid",
  CERTIFICATE_HOLD_PAID: "Certificate hold paid",
  CERTIFICATE_HOLD_DEPOSIT_REFUNDED: "Certificate hold deposit refunded",
  REWARD_WITHDRAWN: "Reward withdrawn",
  REWARD_WITHDRAWN_AND_CERTIFICATE_HOLD_PAID: "Reward withdrawn and certificate hold paid",
  REWARD_WITHDRAWN_AND_CERTIFICATE_HOLD_DEPOSIT_REFUNDED: "Reward withrawn and cetificate hod deposit refunded",
  UNKNOWN: "Unknown"
};

const WalletActitityTab = () => {
  const [sort, setSort] = useState<string>("");
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const fetchData = useFetchList<WalletActivityIF>(API.REPORT.SREPORT_WALLET_ACTIVITY(reportId), {
    ...pageInfo,
    sort
  });
  const columns: Column<IADATransferReport>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Box display="flex" alignItems="center">
          <Amount type={r.amount > 0 ? "up" : "down"}>
            {r.amount > 0 ? "+" : ""}
            {formatADAFull(r.amount)}
          </Amount>
          <CustomIcon icon={AIconGreen} height={15} fill="currentColor" color={(theme) => theme.palette.text.primary} />
        </Box>
      )
    },
    {
      title: "Timestamp",
      key: "time",
      minWidth: "100px",
      render: (r) => formatDateTimeLocal(r.time || ""),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Fees Paid",
      key: "fees",
      render(r) {
        return (
          <ADAValueLabel>
            {formatADAFull(r.fee)} <CustomIcon icon={ADAsigntIC} width={12} />
          </ADAValueLabel>
        );
      }
    },
    {
      title: "Transaction Hash",
      key: "transactionHash",
      minWidth: "100px",
      render: (r) => <StyledLink to={details.transaction(r.txHash || "")}>{getShortHash(r.txHash)}</StyledLink>
    },

    {
      title: "Transaction Type",
      key: "transactionCount",
      minWidth: "100px",
      render: (r) => <Box>{trxType[r.type]}</Box>
    },
    {
      title: "Status",
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

export default WalletActitityTab;
