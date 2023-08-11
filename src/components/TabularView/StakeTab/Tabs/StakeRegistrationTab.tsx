import { Box, IconButton } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";

import useFetchList from "../../../../commons/hooks/useFetchList";
import { EyeIcon } from "../../../../commons/resources";
import { details } from "../../../../commons/routers";
import { API } from "../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../../../commons/utils/helper";
import { RegistrationCertificateModal } from "../../../StakingLifeCycle/DelegatorLifecycle/Registration";
import CustomTooltip from "../../../commons/CustomTooltip";
import Table, { Column } from "../../../commons/Table";
import { StyledLink, TableSubTitle } from "../styles";

const StakeRegistrationTab = () => {
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
      title: "Created At",
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
          <AdaValue value={new BigNumber(r.deposit).plus(new BigNumber(r.fee)).toString()} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              {formatADAFull(r.deposit)}&nbsp;
              <ADAicon width={9} />/{formatADAFull(r.fee)}&nbsp;
              <ADAicon width={9} />
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
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </>
  );
};

export default StakeRegistrationTab;
