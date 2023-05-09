import { Box } from "@mui/material";
import { StyledLink, TableSubTitle } from "../styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { useState } from "react";
import { AdaValue } from "./StakeRegistrationTab";

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
        <Box>ADA Amount</Box>
        <TableSubTitle>Hold/Fees</TableSubTitle>
      </>
    ),
    key: "block",
    minWidth: "120px",
    render: r => (
      <Box>
        <AdaValue value={-r.deposit - r.fee} />
        <TableSubTitle>
          <Box display="flex" mt={1} alignItems="center" lineHeight="1">
            <AdaValue value={-r.deposit} gap="3px" fontSize="12px" />
            <Box mx="3px">/</Box>
            <AdaValue value={r.fee} gap="3px" fontSize="12px" />
          </Box>
        </TableSubTitle>
      </Box>
    ),
  },
];

const DeregistrationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));

  const fetchData = useFetchList<DeregistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DEREGISTRATION(stakeId) : "",
    pageInfo
  );

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => setPageInfo({ ...pageInfo, page, size }),
      }}
      onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default DeregistrationTab;
