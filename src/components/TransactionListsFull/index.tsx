import { Link, useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box, Tooltip } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADA, formatADAFull, getPageInfo, getShortHash, getShortWallet } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import moment from "moment";
import useFetchList from "../../commons/hooks/useFetchList";

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
}

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
    minWidth: 120,
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
    title: "Addresses",
    key: "address",
    minWidth: 120,
    render(r, index) {
      return (
        <div>
          <Box display={"flex"}>
            <div> Input: </div>
            <div>
              {r.addressesInput.slice(0, 1).map((tx, key) => {
                return (
                  <Tooltip key={key} title={tx} placement="top">
                    <Link to={details.address(tx)} key={key}>
                      <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                        <Box>{getShortWallet(tx)}</Box>
                      </Box>
                    </Link>
                  </Tooltip>
                );
              })}
              {r.addressesInput.length > 1 && (
                <Link to={details.transaction(r.hash)}>
                  <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                    ...
                  </Box>
                </Link>
              )}
            </div>
          </Box>
          <Box display={"flex"} mt={1}>
            <div>Output: </div>
            <div>
              {r.addressesOutput.slice(0, 1).map((tx, key) => {
                return (
                  <Tooltip key={key} title={tx} placement="top">
                    <Link to={details.address(tx)} key={key}>
                      <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                        <Box>{getShortWallet(tx)}</Box>
                      </Box>
                    </Link>
                  </Tooltip>
                );
              })}
              {r.addressesOutput.length > 1 && (
                <Link to={details.transaction(r.hash)}>
                  <Box ml={1} color={props => props.colorBlue} fontFamily={"Helvetica, monospace"}>
                    ...
                  </Box>
                </Link>
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
      <CustomTooltip title={formatADAFull(r.fee)}>
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADA(r.fee) || 0}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      </CustomTooltip>
    ),
  },
  {
    title: "Output",
    minWidth: 120,
    key: "ouput",
    render: r => (
      <CustomTooltip title={formatADAFull(r.totalOutput)}>
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADA(r.totalOutput) || 0}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      </CustomTooltip>
    ),
  },
];
const TransactionListFull: React.FC<TransactionListFullProps> = ({ underline = false, url, openDetail, selected }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  return (
    <Card title={"Transactions"} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={onClickRow}
        selected={selected}
      />
    </Card>
  );
};

export default TransactionListFull;
