import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import {
  ADAValueFieldContainer,
  ADAValueLabel,
  ADAValueSubLabel
} from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import RegistrationCertificateModal from "src/components/StakingLifeCycle/SPOLifecycle/Registration/RegistrationCertificateModal";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { ReportGeneratedPoolDetailContext } from "..";

const PoolRegistrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const { poolId } = useContext(ReportGeneratedPoolDetailContext);
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();
  const [selected, setSelected] = useState<number | null>(null);
  const columns: Column<SPORegistrationTabpular>[] = [
    {
      key: "txHash",
      title: t("glossary.txHash"),
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
      title: t("common.adaValue"),
      render(data) {
        return (
          <ADAValueFieldContainer>
            <ADAValueLabel>
              {formatADAFull(data.totalFee)} <ADAicon />
            </ADAValueLabel>
            <ADAValueSubLabel>
              {formatADAFull(data.deposit)} <ADAicon /> / {formatADAFull(data.fee)}
              <ADAicon />
            </ADAValueSubLabel>
          </ADAValueFieldContainer>
        );
      }
    },
    {
      key: "Certificate",
      title: t("common.certificate"),
      render: (data) => (
        <IconButton onClick={() => setSelected(data?.poolUpdateId || 0)}>
          <CustomIcon icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} data-testid="eye-icon" />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(reportId ? API.REPORT.PREPORT_REGISTRATIONS(reportId) : "", {
    ...pageInfo
  });

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
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
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
