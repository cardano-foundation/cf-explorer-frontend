import { BoxProps, IconButton, Box } from "@mui/material";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "../../../commons/utils/helper";
import ADAicon from "../../commons/ADAIcon";

import { useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import CustomTooltip from "../../commons/CustomTooltip";
import { StyledLink } from "../../share/styled";
import { TableSubTitle } from "../../TabularView/StakeTab/styles";
import { details } from "../../../commons/routers";
import useFetchList from "../../../commons/hooks/useFetchList";
import Table, { Column } from "../../commons/Table";
import { API } from "../../../commons/utils/api";
import { StakingDetailContext } from "..";
import { EyeIcon } from "../../../commons/resources";
import { RegistrationCertificateModal } from "../../StakingLifeCycle/DelegatorLifecycle/Registration";

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
  const [pageInfo, setPageInfo] = useState(getPageInfo(search));
  const { stakeKey } = useContext(StakingDetailContext);
  const fetchData = useFetchList<RegistrationItem>(reportId ? API.REPORT.SREPORT_DETAIL_REGISTRATIONS(reportId) : "", {
    ...pageInfo
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
      render: (r) => (
        <IconButton onClick={() => setOpenModal(true)}>
          <EyeIcon style={{ transform: "scale(.8)" }} />
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
