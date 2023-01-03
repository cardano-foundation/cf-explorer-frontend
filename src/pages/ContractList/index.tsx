import React from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { exchangeADAToUSD, formatADA, getShortHash } from "../../commons/utils/helper";
import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/types";
interface Props {}

const Transactions: React.FC<Props> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const { data, loading, initialized, total, currentPage } = useFetchList<Contracts>("contracts", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });
  const { adaRate } = useSelector(({ system }: RootState) => system);

  const columns: Column<Contracts>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => index + 1,
    },
    {
      title: "Contract Addresses",
      key: "trxhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.address} placement="top">
            <StyledLink to={routers.CONTRACT_DETAIL.replace(":address", `${r.address}`)}>
              {getShortHash(r.address)}
            </StyledLink>
          </CustomTooltip>
        </div>
      ),
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: 60,
      render: r => (
        <Box display="flex" alignItems="center">
          <Box mr={1}>{formatADA(r.balance) || 0}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
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
          columns={columns}
          data={data}
          total={{ count: total, title: "Total Contracts" }}
          loading={loading}
          initialized={initialized}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: currentPage || 0,
            total: total,
          }}
          selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
        />
      </Card>
    </StyledContainer>
  );
};

export default Transactions;
