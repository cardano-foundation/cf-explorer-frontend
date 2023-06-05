import { Box, BoxProps, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BigNumber from "bignumber.js";

import useFetchList from "../../../../commons/hooks/useFetchList";
import { EyeIcon } from "../../../../commons/resources";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import { RegistrationCertificateModal } from "../../../StakingLifeCycle/DelegatorLifecycle/Registration";
import ADAicon from "../../../commons/ADAIcon";
import CustomTooltip from "../../../commons/CustomTooltip";
import Table, { Column } from "../../../commons/Table";
import { StyledLink, TableSubTitle } from "../styles";

interface IAdaValue extends BoxProps {
  value: number | string;
  limit?: number;
}

export const AdaValue = ({ value, gap = "8px", fontSize, color, limit, ...props }: IAdaValue) => {
  return (
    <Box {...props} color={color} display="flex" alignItems="center" gap={gap} fontSize={fontSize}>
      {formatADAFull(value, limit)}
      <ADAicon style={{ color }} fontSize={fontSize} />
    </Box>
  );
};

const StakeRegistrationTab = () => {
  const theme = useTheme();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [sort, setSort] = useState<string>("");
  const [pageInfo, setPageInfo] = useState(getPageInfo(search));
  const [openModal, setOpenModal] = useState(false);
  const fetchData = useFetchList<RegistrationItem>(stakeId ? API.STAKE_LIFECYCLE.REGISTRATION(stakeId) : "", {
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
      key: "id",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
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
          <AdaValue limit={6} value={new BigNumber(r.deposit).plus(new BigNumber(r.fee)).toString()} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue limit={1} value={r.deposit} color={theme.palette.grey[400]} gap="3px" fontSize="12px" />
              <Box mx={1}>/</Box>
              <AdaValue value={r.fee} color={theme.palette.grey[400]} gap="3px" fontSize="12px" />
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
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </>
  );
};

export default StakeRegistrationTab;
