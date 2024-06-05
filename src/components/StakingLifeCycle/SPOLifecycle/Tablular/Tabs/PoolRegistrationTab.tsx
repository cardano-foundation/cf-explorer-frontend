import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { RegistrationCertificateModal } from "../../Registration/RegistrationCertificateModal";

const PoolRegistrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { poolId = "", tab } = useParams<{ poolId: string; tab: string }>();

  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const [selected, setSelected] = useState<number | null>(null);

  const columns: Column<SPORegistrationTabpular>[] = [
    {
      key: "txHash",
      title: t("glossary.transactionHash"),
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
        sortValue ? setSort(`bk.${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return <DatetimeTypeTooltip>{formatDateTimeLocal(data.time)}</DatetimeTypeTooltip>;
      }
    },
    {
      key: "fee",
      title: (
        <Box>
          {t("glossary.adaValue")}
          <Box fontSize={"0.75rem"} fontWeight={"normal"}>
            {t("common.holdOrFees")}
          </Box>
        </Box>
      ),
      render(data) {
        return (
          <Box>
            <AdaValue value={data.totalFee} />
            <TableSubTitle>
              <Box display="flex" mt={1} alignItems="center" lineHeight="1">
                {formatADAFull(data.deposit)}&nbsp;
                <ADAicon width={9} />/{formatADAFull(data.fee)}&nbsp;
                <ADAicon width={9} />
              </Box>
            </TableSubTitle>
          </Box>
        );
      }
    },
    {
      key: "Certificate",
      title: t("common.certificate"),
      render: (data) => (
        <IconButton onClick={() => setSelected(data?.poolUpdateId || 0)}>
          <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(
    poolId && tab === "registration" ? API.SPO_LIFECYCLE.SPO_REGISTRATION_LIST(poolId) : "",
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
      <RegistrationCertificateModal
        poolUpdateId={selected || 0}
        open={!!selected}
        onClose={() => setSelected(null)}
        poolId={poolId}
      />
    </Box>
  );
};

export default PoolRegistrationTab;
