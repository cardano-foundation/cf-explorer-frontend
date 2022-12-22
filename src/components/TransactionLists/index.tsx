import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADA, getShortHash } from "../../commons/utils/helper";
import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import DetailViewTransaction from "../commons/DetailView/DetailViewTransaction";
import { useState } from "react";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";
import CustomTooltip from "../commons/CustomTooltip";

interface TransactionListProps {
  underline?: boolean;
  transactions: Transactions[];
  loading: boolean;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  error?: string | null;
}

const TransactionList: React.FC<TransactionListProps> = ({
  underline = false,
  currentPage,
  loading,
  initialized,
  total,
  transactions,
  error,
}) => {
  const [detailView, setDetailView] = useState<string | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => index + 1,
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.hash} placement="top">
            <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}>
              {getShortHash(r.hash)}
            </StyledLink>
          </CustomTooltip>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: 60,
      render: r => <StyledLink to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>{r.blockNo}</StyledLink>,
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: 120,
      render: r => (
        <Box display="flex" alignItems="center">
          <Box mr={1}>{formatADA(r.fee) || 0}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
    {
      title: "Output",
      minWidth: 120,
      key: "ouput",
      render: r => (
        <Box display="flex" alignItems="center">
          <Box mr={1}>{formatADA(r.totalOutput) || 0}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
  ];
  const openDetail = (_: any, r: Transactions) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.hash);
    } else history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };

  const selected = transactions?.findIndex(item => item.hash === detailView);
  return (
    <StyledContainer>
      <Card title={"Transactions"} underline={underline}>
        <Table
          columns={columns}
          data={transactions}
          total={{ count: total, title: "Total Transactions" }}
          loading={loading}
          initialized={initialized}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: currentPage || 0,
            total: total,
          }}
          onClickRow={openDetail}
          selected={selected}
          selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
          error={error}
        />
      </Card>
      {detailView && <DetailViewTransaction hash={detailView} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default TransactionList;
