import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import useFetch from "src/commons/hooks/useFetch";
import useFetchList from "src/commons/hooks/useFetchList";
import { AIconGreen } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomIcon from "src/components/commons/CustomIcon";
import Table, { Column } from "src/components/commons/Table";

import UserInfo from "./UserInfo";
import { Amount, Status, StyledBoxTransaction, StyledLink } from "./styles";

const WalletActivity: React.FC = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [sort, setSort] = useState<string>("");
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");
  const { isMobile, isGalaxyFoldSmall, isTablet } = useScreen();

  const fetchData = useFetchList<WalletActivityIF>(API.STAKE_LIFECYCLE.WALLET_ACTIVITY(stakeId), { ...pageInfo, sort });

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

  const columns: Column<WalletActivityIF>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Box display="flex" alignItems="center">
          <Amount type={r.amount > 0 ? "up" : "down"}>
            {r.amount > 0 ? `+${formatADAFull(r.amount)}` : formatADAFull(r.amount)}
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
      title: "Transaction Hash",
      key: "transactionHash",
      minWidth: "100px",
      render: (r) => <StyledLink to={details.transaction(r.txHash || "")}>{getShortHash(r.txHash)}</StyledLink>
    },

    {
      title: "Transaction Type",
      key: "transactionCount",
      minWidth: "100px",
      render: (r) => <StyledBoxTransaction>{trxType[r.type]}</StyledBoxTransaction>
    },
    {
      title: "Status",
      key: "status",
      minWidth: "150px",
      render: (r) => <Status status={r.status}>{r.status}</Status>
    }
  ];
  const maxHeightCalc = `calc(70vh - ${
    isTablet ? "290px" : isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"
  })`;
  
  return (
    <Box>
      <UserInfo acitve="wallet" total={fetchData.total} reward={data?.totalStake || 0} stake={stakeId} />
      <StyledTable
        {...fetchData}
        maxHeight={maxHeightCalc}
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

export default WalletActivity;
const StyledTable = styled(Table)(() => ({
  "> :nth-child(2)": {
    boxShadow: "none !important"
  }
}));
