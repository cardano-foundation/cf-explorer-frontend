import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { exchangeADAToUSD, formatADA, formatADAFull, getPageInfo, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/types";

const Transactions: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Contracts>("contracts", pageInfo);
  const { adaRate } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    document.title = `Contracts List | Cardano Explorer`;
  }, []);

  const columns: Column<Contracts>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1||0),
    },
    {
      title: "Contract Addresses",
      key: "trxhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.address} placement="top">
            <StyledLink to={details.contract(r.address)}>{getShortWallet(r.address)}</StyledLink>
          </CustomTooltip>
        </div>
      ),
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: 60,
      render: r => (
        <CustomTooltip title={formatADAFull(r.balance)}>
          <Box display="inline-flex" alignItems="center">
            <Box mr={1}>{formatADA(r.balance) || 0}</Box>
            <img src={AIcon} alt="a icon" />
          </Box>
        </CustomTooltip>
      ),
    },
    {
      title: "Value",
      key: "value",
      minWidth: 120,
      render: r => (
        <Box display="flex" alignItems="center">
          {exchangeADAToUSD(r.balance, adaRate)}
        </Box>
      ),
    },
    {
      title: "Transaction Count",
      minWidth: 120,
      key: "transaction_count",
      render: r => (
        <Box display="flex" alignItems="center">
          {r.txCount}
        </Box>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title={"Contracts"} underline={false}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Contracts", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
        />
      </Card>
    </StyledContainer>
  );
};

export default Transactions;
