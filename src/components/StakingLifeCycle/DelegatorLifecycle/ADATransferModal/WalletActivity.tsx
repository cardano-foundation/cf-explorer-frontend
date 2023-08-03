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
import CustomTooltip from "src/components/commons/CustomTooltip";

import UserInfo from "./UserInfo";
import { Amount, Status, StyledLink } from "./styles";

const WalletActivity: React.FC = () => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [sort, setSort] = useState<string>("");
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || "");
  const { isMobile, isGalaxyFoldSmall, isTablet } = useScreen();

  const fetchData = useFetchList<WalletActivityIF>(API.STAKE_LIFECYCLE.WALLET_ACTIVITY(stakeId), { ...pageInfo, sort });

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
      title: "Created At",
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
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash || "")}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Status",
      key: "status",
      minWidth: "150px",
      render: (r) => <Status status={r.status}>{r.status}</Status>
    }
  ];
  const maxHeightCalc = `calc(70vh - ${isTablet ? "290px" : isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"
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
  "> :nth-of-type(2)": {
    boxShadow: "none !important"
  }
}));
