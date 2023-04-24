import { stringify } from "qs";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "../../../../commons/utils/helper";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { Status, StyledLink, TextAmountReward } from "./styles";
import CustomIcon from "../../../commons/CustomIcon";
import { AIconGreen } from "../../../../commons/resources";
import UserInfo from "./UserInfo";
import { EPOCH_STATUS } from "../../../../commons/utils/constants";

const RewardActivity: React.FC = () => {
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 });
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort });

  const columns: Column<IDataEpoch>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <Box display="flex" alignItems="center">
          <TextAmountReward>{formatADAFull(r.outSum)}</TextAmountReward>
          <CustomIcon icon={AIconGreen} height={15} fill="currentColor" color={theme => theme.palette.text.primary} />
        </Box>
      ),
    },
    {
      title: "Timestamp",
      key: "startTime",
      minWidth: "100px",
      render: r => formatDateTimeLocal(r.startTime || ""),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Epoch",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <StyledLink to={details.epoch(r.no || 0)}>{r.no}</StyledLink>,
    },

    {
      title: "Transaction Type",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Box>ADA sent from wallet</Box>,
    },
    {
      title: "Status",
      key: "status",
      minWidth: "150px",
      render: r => <Status status={r.status.toLowerCase()}>{EPOCH_STATUS[r.status]}</Status>,
    },
  ];

  return (
    <Box>
      <UserInfo total={fetchData.total} />
      <Table
        {...fetchData}
        maxHeight={'calc(70vh - 208px)'}
        columns={columns}
        total={{ title: "Total Epochs", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo({ page, size }),
        }}
      />
    </Box>
  );
};

export default RewardActivity;
