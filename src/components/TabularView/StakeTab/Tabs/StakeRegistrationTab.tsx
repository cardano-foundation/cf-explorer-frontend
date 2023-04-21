import { Box, BoxProps } from "@mui/material";
import { StyledLink, TableSubTitle } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull } from "../../../../commons/utils/helper";
import ADAicon from "../../../commons/ADAIcon";

interface IAdaValue extends BoxProps {
  value: string;
}

export const AdaValue = ({ value, ...props }: IAdaValue) => {
  return (
    <Box {...props} display="flex" alignItems="center">
      {formatADAFull(value)}
      <ADAicon pl={"8px"} />
    </Box>
  );
};

const columns: Column<DelegationHistory>[] = [
  {
    title: "Transaction Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={"fghij...76543"}>
        <StyledLink to="/">{getShortWallet("fghijsdfsdfsdf76543")}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Timestamp",
    key: "time",
    minWidth: "120px",
    render: r => formatDateTimeLocal("10/24/2022 14:09:02"),
  },
  {
    title: (
      <>
        <Box>ADA Value</Box>
        <TableSubTitle>Hold/Fees</TableSubTitle>
      </>
    ),
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <AdaValue value="234154851.36871" />
        <TableSubTitle>
          <Box display="flex" mt={1} alignItems="center">
            <AdaValue value="2.0" />
            <Box mx={1}>/</Box>
            <AdaValue value="234154851.36871" />
          </Box>
        </TableSubTitle>
      </Box>
    ),
  },
  {
    title: "Certificate",
    key: "poolId",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={"fghij...76543"}>
        <StyledLink to="/">{getShortWallet("fghijsdfsdfsdf76543")}</StyledLink>
      </CustomTooltip>
    ),
  },
];

const StakeRegistrationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<any>(`${API.STAKE.DETAIL}/${stakeId}/delegation-history`, pageInfo);

  return (
    <Table
      {...fetchData}
      data={[...new Array(10)]}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
      onClickRow={(e, r: DelegationHistory) => history.push(details.delegation(r.poolId))}
    />
  );
};

export default StakeRegistrationTab;
