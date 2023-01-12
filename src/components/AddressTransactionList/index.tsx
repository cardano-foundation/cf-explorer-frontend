import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADA, getPageInfo, getShortHash, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import moment from "moment";
import useFetchList from "../../commons/hooks/useFetchList";
import BigNumber from "bignumber.js";

interface AddressTransactionListProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
}

const AddressTransactionList: React.FC<AddressTransactionListProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => pageInfo.page * pageInfo.size + index + 1,
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.hash}>
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
      render: r => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>,
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
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)}>{getShortWallet(tx)}</StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesInput.length > 1 && <StyledLink to={details.transaction(r.hash)}> ...</StyledLink>}
              </div>
            </Box>
            <Box display={"flex"} mt={1}>
              <div>Output: </div>
              <div>
                {r.addressesOutput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)}>{getShortWallet(tx)}</StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesOutput.length > 1 && <StyledLink to={details.transaction(r.hash)}> ...</StyledLink>}
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
        <CustomTooltip title={numberWithCommas(new BigNumber(r.fee).div(10 ** 6).toString())}>
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
        <CustomTooltip title={numberWithCommas(new BigNumber(r.totalOutput).div(10 ** 6).toString())}>
          <Box display="inline-flex" alignItems="center">
            <Box mr={1}>{formatADA(r.totalOutput) || 0}</Box>
            <img src={AIcon} alt="a icon" />
          </Box>
        </CustomTooltip>
      ),
    },
  ];

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

export default AddressTransactionList;
