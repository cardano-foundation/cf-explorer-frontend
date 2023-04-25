import { Box, BoxProps } from "@mui/material";
import { StyledLink, TableSubTitle } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull } from "../../../../commons/utils/helper";
import ADAicon from "../../../commons/ADAIcon";

interface IAdaValue extends BoxProps {
  value: number | string;
}

export const AdaValue = ({ value, ...props }: IAdaValue) => {
  return (
    <Box {...props} display="flex" alignItems="center">
      {formatADAFull(value)}
      <ADAicon pl={"8px"} />
    </Box>
  );
};

const columns: Column<RegistrationItem>[] = [
  {
    title: "Transaction Hash",
    key: "hash",
    minWidth: "120px",
    render: r => (
      <CustomTooltip title={r.txHash}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Timestamp",
    key: "time",
    minWidth: "120px",
    render: r => formatDateTimeLocal(r.time),
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
        <AdaValue value={r.deposit + r.fee} />
        <TableSubTitle>
          <Box display="flex" mt={1} alignItems="center">
            <AdaValue value={r.deposit} />
            <Box mx={1}>/</Box>
            <AdaValue value={r.fee} />
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
      <CustomTooltip title={r.txHash}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </CustomTooltip>
    ),
  },
];

const StakeRegistrationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<RegistrationItem>(stakeId ? API.STAKE_LIFECYCLE.REGISTRATION(stakeId) : "", pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
      onClickRow={(e, r: RegistrationItem) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default StakeRegistrationTab;
