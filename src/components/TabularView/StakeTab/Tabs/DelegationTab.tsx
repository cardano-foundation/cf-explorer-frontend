import { Box } from "@mui/material";
import { ButtonFilter, StyledLink, TextResult, WrapWalletLabel } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { AdaValue } from "./StakeRegistrationTab";
import { GreenWalletIcon } from "../../TabularOverview";

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
    title: "Fees",
    key: "block",
    minWidth: "120px",
    render: r => <AdaValue value="234154851.36871" />,
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

const DelegationTab = () => {
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

export default DelegationTab;
