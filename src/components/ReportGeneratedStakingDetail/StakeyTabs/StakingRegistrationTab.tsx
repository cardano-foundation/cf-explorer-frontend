import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BoxProps, IconButton, Box } from "@mui/material";

import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledLink } from "src/components/share/styled";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import Table, { Column } from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import { EyeIcon } from "src/commons/resources";
import { RegistrationCertificateModal } from "src/components/StakingLifeCycle/DelegatorLifecycle/Registration";

import { StakingDetailContext } from "..";

interface IAdaValue extends BoxProps {
  value: number | string;
}

export const AdaValue = ({ value, gap = "8px", fontSize, ...props }: IAdaValue) => {
  return (
    <Box {...props} display="flex" alignItems="center" gap={gap} fontSize={fontSize}>
      {formatADAFull(value)}
      <ADAicon fontSize={fontSize} />
    </Box>
  );
};

const StakingRegistrationTab = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  const [sort, setSort] = useState<string>("");
  const [pageInfo, setPageInfo] = useState(getPageInfo(search));
  const { stakeKey } = useContext(StakingDetailContext);
  const fetchData = useFetchList<RegistrationItem>(reportId ? API.REPORT.SREPORT_DETAIL_REGISTRATIONS(reportId) : "", {
    ...pageInfo,
    sort
  });

  const columns: Column<RegistrationItem>[] = [
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
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render: (r) => formatDateTimeLocal(r.time)
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
      render: (r) => (
        <Box>
          <AdaValue value={r.deposit + r.fee} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue value={r.deposit} gap="3px" fontSize="12px" />
              <Box mx={1}>/</Box>
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
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: RegistrationItem) => history.push(details.transaction(r.txHash))}
      />
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeKey} />
    </>
  );
};

export default StakingRegistrationTab;
