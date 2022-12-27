import { Link, useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box, Tooltip } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADA, getShortHash, getShortWallet } from "../../commons/utils/helper";
import { details, routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import DetailViewTransaction from "../commons/DetailView/DetailViewTransaction";
import { useState } from "react";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";
import CustomTooltip from "../commons/CustomTooltip";
import { BiLinkExternal } from "react-icons/bi";
import moment from "moment";

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
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
          <Box mt={1}>{moment(r.time).format("MM/DD/YYYY hh:mm:ss")}</Box>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: 60,
      render: r => (
        <Box>
          <Box>
            <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          </Box>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.slot}
          </Box>
        </Box>
      ),
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render(r, index) {
        return (
          <div>
            <Box display={"flex"}>
              <div> Input: </div>
              <div>
                {r.addressesInput.slice(0, 2).map((tx, key) => {
                  return (
                    <Tooltip key={key} title={tx} placement="top">
                      <Link to={routers.ADDRESS_DETAIL.replace(":address", tx)} key={key}>
                        <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                          <Box>{getShortWallet(tx)}</Box>
                        </Box>
                      </Link>
                    </Tooltip>
                  );
                })}
                {r.addressesInput.length > 2 && (
                  <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}>...</Link>
                )}
              </div>
            </Box>
            <Box display={"flex"} mt={1}>
              <div>Output: </div>
              <div>
                {r.addressesOutput.slice(0, 2).map((tx, key) => {
                  return (
                    <Tooltip key={key} title={tx} placement="top">
                      <Link to={routers.ADDRESS_DETAIL.replace(":address", tx)} key={key}>
                        <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                          <Box>{getShortWallet(tx)}</Box>
                        </Box>
                      </Link>
                    </Tooltip>
                  );
                })}
                {r.addressesOutput.length > 2 && (
                  <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}>...</Link>
                )}
              </div>
            </Box>
          </div>
        );
      },
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
    } else history.push(details.transaction(r.hash));
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
