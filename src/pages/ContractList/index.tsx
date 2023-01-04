import React from "react";
import { useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { formatADA, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";

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
        "NaN"
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

const Transactions: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Contracts>("contracts", pageInfo);

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
