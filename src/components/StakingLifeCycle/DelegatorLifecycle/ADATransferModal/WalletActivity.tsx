import { stringify } from "qs";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { Status, StyledLink, TextAmountReward } from "./styles";
import CustomIcon from "../../../commons/CustomIcon";
import { AIconGreen } from "../../../../commons/resources";
import UserInfo from "./UserInfo";
import { EPOCH_STATUS } from "../../../../commons/utils/constants";
import useFetch from "../../../../commons/hooks/useFetch";
import { useScreen } from "~/commons/hooks/useScreen";

const WalletActivity: React.FC = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [sort, setSort] = useState<string>("");
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");
  const { isMobile, isGalaxyFoldSmall } = useScreen();

  const fetchData = useFetchList<WalletActivityIF>(API.STAKE_LIFECYCLE.WALLET_ACTIVITY(stakeId), { ...pageInfo, sort });

  const trxType = {
    SENT: "ADA sent from wallet",
    RECEIVED: "ADA received",
    FEE_PAID: "Transaction fee paid",
    CERTIFICATE_FEE_PAID: "Certificate fee paid",
    CERTIFICATE_DEPOSIT_PAID: "Certificate deposit paid",
    CERTIFICATE_HOLD_PAID: "Certificate hold paid",
    CERTIFICATE_HOLD_DEPOSIT_REFUNDED: "Hold deposit refunded",
    REWARD_WITHDRAWN: "Reward withdrawn"
  };

  const columns: Column<WalletActivityIF>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Box display='flex' alignItems='center'>
          <TextAmountReward>{r.amount > 0 ? `+${formatADAFull(r.amount)}` : formatADAFull(r.amount)}</TextAmountReward>
          <CustomIcon icon={AIconGreen} height={15} fill='currentColor' color={(theme) => theme.palette.text.primary} />
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
    <Box>
      <UserInfo acitve='wallet' total={fetchData.total} reward={data?.totalStake || 0} stake={stakeId} />
      <StyledTable
        {...fetchData}
        maxHeight={`calc(70vh - ${isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"})`}
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
