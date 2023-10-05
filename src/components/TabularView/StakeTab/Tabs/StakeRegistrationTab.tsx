import { Box, IconButton, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";

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
  const { t } = useTranslation();
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
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
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
          <Box>{t("common.adaValue")}</Box>
          <TableSubTitle>{t("common.holdOrFees")}</TableSubTitle>
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
      title: t("common.certificate"),
      key: "stakeId",
      minWidth: "120px",
      render: () => (
        <IconButton onClick={() => setOpenModal(true)}>
          <CustomIcon icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
        </IconButton>
      )
    }
  ];

  return (
    <>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("common.total"), count: fetchData.total }}
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
