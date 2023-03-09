import React, { useEffect } from "react";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { formatADAFull, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { API } from "../../commons/utils/api";
interface Props {}

const TopAddresses: React.FC<Props> = () => {
  const history = useHistory();
  const { error, data, initialized, loading } = useFetchList<Contracts>(API.ADDRESS.TOP_ADDRESS, { page: 0, size: 50 });

  useEffect(() => {
    document.title = `Top Addresses | Cardano Explorer`;
  }, []);

  const columns: Column<Address>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => numberWithCommas(index + 1),
    },
    {
      title: "Addresses",
      key: "address",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.address}>
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
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.balance)}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title={"Top 50 addresses"} underline={false}>
        <Table
          // onClickRow={(_, r) => history.push(details.address(r.address))}
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
