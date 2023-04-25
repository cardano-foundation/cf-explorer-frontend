import { Box } from "@mui/material";
import { ButtonFilter, StyledLink, TextResult, WrapWalletLabel } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { AdaValue } from "./StakeRegistrationTab";
import { GreenWalletIcon } from "../../TabularOverview";

const columns: Column<DelegationItem>[] = [
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
    title: "Fees",
    key: "block",
    minWidth: "120px",
    render: r => <AdaValue value={r.outSum} />,
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

const DelegationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<DelegationItem>(stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "", pageInfo);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <AdaValue value="234154851.36871" />
        </WrapWalletLabel>
        <Box display="flex" alignItems="center">
          <TextResult>Showing {fetchData.total} results</TextResult>
          <ButtonFilter>Filter</ButtonFilter>
        </Box>
      </Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={(e, r: DelegationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default DelegationTab;
