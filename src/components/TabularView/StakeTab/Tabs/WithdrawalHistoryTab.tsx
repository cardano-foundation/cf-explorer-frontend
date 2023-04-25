import { Box } from "@mui/material";
import { ButtonFilter, StyledLink, TableSubTitle, TextResult, WrapWalletLabel } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { AdaValue } from "./StakeRegistrationTab";
import { GreenWalletIcon } from "../../TabularOverview";
import CustomTooltip from "../../../commons/CustomTooltip";

const columns: Column<DeregistrationItem>[] = [
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
        <Box>Net Amount</Box>
        <TableSubTitle>Withdrawn/Fees</TableSubTitle>
      </>
    ),
    key: "epoch",
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
];

const WithdrawalHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<DeregistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DEREGISTRATION(stakeId) : "",
    pageInfo
  );

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
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default WithdrawalHistoryTab;
