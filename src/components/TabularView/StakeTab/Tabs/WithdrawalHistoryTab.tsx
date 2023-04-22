import { Box } from "@mui/material";
import { ButtonFilter, StyledLink, TableSubTitle, TextResult, WrapWalletLabel } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { AdaValue } from "./StakeRegistrationTab";
import { GreenWalletIcon } from "../../TabularOverview";
import CustomTooltip from "../../../commons/CustomTooltip";

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
        <Box>Net Amount</Box>
        <TableSubTitle>Withdrawn/Fees</TableSubTitle>
      </>
    ),
    key: "epoch",
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
];

const WithdrawalHistoryTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<any>(`${API.STAKE.DETAIL}/${stakeId}/delegation-history`, pageInfo);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <AdaValue value="234154851.36871" />
        </WrapWalletLabel>
        <Box display="flex" alignItems="center">
          <TextResult>Showing 10 results</TextResult>
          <ButtonFilter>Filter</ButtonFilter>
        </Box>
      </Box>
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
    </>
  );
};

export default WithdrawalHistoryTab;
