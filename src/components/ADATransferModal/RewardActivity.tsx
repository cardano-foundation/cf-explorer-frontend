import { stringify } from "qs";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";
import { Box, useTheme } from "@mui/material";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "../../commons/utils/helper";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import Table, { Column } from "../commons/Table";
import { details } from "../../commons/routers";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import { Blocks } from "../../pages/Epoch/styles";
import ADAicon from "../commons/ADAIcon";
import { StyledColorBlueDard } from "../EpochDetail/EpochBlockList/styles";
import { setOnDetailView } from "../../stores/user";
import { StyledLink } from "../share/styled";
import CustomTooltip from "../commons/CustomTooltip";
import { TextAmountReward } from "./styles";

const RewardActivity: React.FC = () => {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort });

  const columns: Column<IDataEpoch>[] = [
    {
      title: "Amount ADA",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <Box>
          <TextAmountReward>{formatADAFull(r.outSum)}</TextAmountReward>&nbsp;
          <ADAicon />
        </Box>
      ),
    },
    {
      title: "Timestamp",
      key: "startTime",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{formatDateTimeLocal(r.startTime || "")}</StyledColorBlueDard>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Epoch",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Link to={details.epoch(r.no || 0)}>{r.no}</Link>,
    },

    {
      title: "Transaction Type",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Blocks>ADA sent from wallet</Blocks>,
    },
  ];

  const openDetail = (_: any, r: IDataEpoch, index: number) => {
    if (width >= theme.breakpoints.values.md) {
      setOnDetailView(true);
      setEpoch(r.no);
      setSelected(index);
    } else history.push(details.epoch(r.no));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setEpoch(null);
    setSelected(null);
  };

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total Epochs", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        handleCloseDetailView: handleClose,
      }}
      onClickRow={openDetail}
      selected={selected}
    />
  );
};

export default RewardActivity;
