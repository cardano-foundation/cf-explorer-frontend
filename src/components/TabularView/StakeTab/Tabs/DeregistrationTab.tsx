import { Box, IconButton, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import { EyeIcon } from "src/commons/resources";
import { DeregistrationCertificateModal } from "src/components/commons/DeregistrationCertificateModal";
import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { StyledLink, TableSubTitle } from "../styles";

const DeregistrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { stakeId, tab } = useParams<{ stakeId: string; tab: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();
  const [openModal, setOpenModal] = useState(false);

  const fetchData = useFetchList<DeregistrationItem>(
    stakeId && tab === "deregistration" ? API.STAKE_LIFECYCLE.DEREGISTRATION(stakeId) : "",
    {
      ...pageInfo,
      tab
    }
  );

  const columns: Column<DeregistrationItem>[] = [
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
      key: "time",
      minWidth: "120px",
      render: (r) => <DatetimeTypeTooltip>{formatDateTimeLocal(r.time)}</DatetimeTypeTooltip>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <>
          <Box>{t("common.adaAmount")}</Box>
          <TableSubTitle>{t("common.holdOrFees")}</TableSubTitle>
        </>
      ),
      key: "block",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <TableSubTitle>
            <AdaValue color={theme.palette.secondary.main} value={-r.deposit - r.fee} fontSize="14px" />
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              {formatADAFull(new BigNumber(r.deposit).times(-1).toString())}&nbsp;
              <ADAicon width={9} />/{formatADAFull(r.fee)}
              &nbsp;
              <ADAicon width={9} />
            </Box>
          </TableSubTitle>
        </Box>
      )
    },
    {
      title: t("common.certificate"),
      key: "txHash",
      minWidth: "120px",
      render: () => (
        <IconButton onClick={() => setOpenModal(true)}>
          <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
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
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
        }}
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
      <DeregistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </>
  );
};

export default DeregistrationTab;
