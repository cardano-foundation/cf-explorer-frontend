import { stringify } from "qs";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "../../../../commons/utils/helper";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { Amount } from "./styles";
import CustomIcon from "../../../commons/CustomIcon";
import { AIconGreen } from "../../../../commons/resources";
import { Box } from "@mui/material";
import UserInfo from "./UserInfo";

const WalletActivity: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort });

  const columns: Column<IDataEpoch>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <Amount value={r.outSum}>
          {formatADAFull(r.outSum)}
          <CustomIcon icon={AIconGreen} height={15} fill="currentColor" color={theme => theme.palette.text.primary} />
        </Amount>
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
      title: "Transaction Hash",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Link to={details.epoch(r.no || 0)}>fghijsadsd...{r.no}</Link>,
    },

    {
      title: "Transaction Type",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Box>ADA sent from wallet</Box>,
    },
  ];

  return (
    <Box>
      <UserInfo total={fetchData.total} />
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total Epochs", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
      />
    </Box>
  );
};

export default WalletActivity;
