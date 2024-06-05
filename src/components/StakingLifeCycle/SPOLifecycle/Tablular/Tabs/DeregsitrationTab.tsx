import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { DeregistrationCertificateModal } from "../../Deregistration";

const DeregsitrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { poolId = "", tab } = useParams<{ poolId: string; tab: string }>();
  const history = useHistory();

  const { pageInfo, setSort } = usePageInfo();

  const [selected, setSelected] = useState<SPODeregistration | null>(null);

  const columns: Column<SPODeregistrationTabpular>[] = [
    {
      key: "txHash",
      title: t("common.txhash"),
      render(data) {
        return (
          <CustomTooltip title={data.txHash}>
            <StyledLink to={details.transaction(data.txHash)}>{getShortHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      }
    },
    {
      key: "time",
      title: t("createdAt"),
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return <DatetimeTypeTooltip>{formatDateTimeLocal(data.time)}</DatetimeTypeTooltip>;
      }
    },
    {
      key: "fee",
      title: t("common.fees"),
      render(data) {
        return <AdaValue value={data.fee} />;
      }
    },
    {
      key: "Certificate",
      title: t("common.certificate"),
      render: (data) => (
        <IconButton onClick={() => setSelected(data)}>
          <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    poolId && tab === "deregistration" ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : "",
    {
      ...pageInfo,
      tab
    }
  );

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: t("common.poolRegistration"),
          count: fetchData.total
        }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          }
        }}
      />
      <DeregistrationCertificateModal data={selected} open={!!selected} handleCloseModal={() => setSelected(null)} />
    </Box>
  );
};

export default DeregsitrationTab;
