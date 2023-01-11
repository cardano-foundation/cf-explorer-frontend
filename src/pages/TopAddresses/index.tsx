import React from "react";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { formatADAFull, formatBalanceWithDecimal, getShortWallet } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
interface Props {}

const TopAddresses: React.FC<Props> = () => {
  const history = useHistory();
  const { error, data, initialized, loading } = useFetchList<Contracts>("address/top-addresses", { page: 0, size: 50 });

  const columns: Column<Address>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => index + 1,
    },
    {
      title: "Addresses",
      key: "address",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.address} placement="top">
            <StyledLink to={details.address(r.address)}>{getShortWallet(r.address)}</StyledLink>
          </CustomTooltip>
        </div>
      ),
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: 60,
      render: r => (
        <CustomTooltip placement="top" title={formatADAFull(r.balance)}>
          <Box display="inline-flex" alignItems="center">
            <Box mr={1}>{formatBalanceWithDecimal(r.balance || 0, 5)}</Box>
            <img src={AIcon} alt="a icon" />
          </Box>
        </CustomTooltip>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title={"Top 50 addresses"} underline={false}>
        <Table
          onClickRow={(_, r) => history.push(details.address(r.address))}
          data={data}
          error={error}
          loading={loading}
          initialized={initialized}
          columns={columns}
        />
      </Card>
    </StyledContainer>
  );
};

export default TopAddresses;
