import React from "react";
import { useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { formatADA, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledContainer, StyledLink } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
interface Props {}

const TopAddresses: React.FC<Props> = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Contracts>("address/top-addresses", pageInfo);

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
            <StyledLink to={details.address(r.address)}>{getShortHash(r.address)}</StyledLink>
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
  ];

  return (
    <StyledContainer>
      <Card title={"Top 50 addresses"} underline={false}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Addresses", count: fetchData.total }}
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

export default TopAddresses;
