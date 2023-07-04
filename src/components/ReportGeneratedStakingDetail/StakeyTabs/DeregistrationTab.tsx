import { Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { DeregistrationCertificateModal } from "src/components/commons/DeregistrationCertificateModal";

import { AdaValue } from "./StakingRegistrationTab";
import { StakingDetailContext } from "..";

const DeregistrationTab = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const { stakeKey } = useContext(StakingDetailContext);
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<DeregistrationItem>(
    reportId ? API.REPORT.SREPORT_DETAIL_DEGEGISTRATIONS(reportId) : "",
    { ...pageInfo, sort }
  );
  const columns: Column<DeregistrationItem>[] = [
    {
      title: "Transaction Hash",
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Timestamp",
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
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
      render: (r) => (
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
      )
    },
    {
      title: "Certificate",
      key: "stakeId",
      minWidth: "120px",
      render: () => (
        <IconButton onClick={() => setOpenModal(true)}>
          <EyeIcon />
        </IconButton>
      )
    }
  ];

  return (
    <>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo({ ...pageInfo, page: page - 1, size })
        }}
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
      <DeregistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeKey} />
    </>
  );
};

export default DeregistrationTab;
