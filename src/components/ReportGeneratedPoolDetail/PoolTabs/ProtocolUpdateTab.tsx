import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import usePageInfo from "src/commons/hooks/usePageInfo";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledLink } from "src/components/share/styled";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { ADAValueLabel, ClickAbleLink } from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import { EyeIcon } from "src/commons/resources";
import useFetchList from "src/commons/hooks/useFetchList";
import { PoolUpdateModal } from "src/components/StakingLifeCycle/SPOLifecycle/PoolUpdates/PoolUpdateModal";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";

const ProtocolUpdateTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [selectedValue, setSelectedValue] = useState<PoolUpdateDetail | null>(null);
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const columns: Column<PoolUpdateDetail>[] = [
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
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: "fee",
      title: t("common.fees"),
      render(data) {
        return (
          <ADAValueLabel>
            {formatADAFull(data.fee)}
            <ADAicon />
          </ADAValueLabel>
        );
      }
    },
    {
      key: "Certificate",
      title: t("common.certificate"),
      render(data) {
        return (
          <ClickAbleLink onClick={() => setSelectedValue(data)}>
            <CustomIcon icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} data-testid="eye-icon" />
          </ClickAbleLink>
        );
      }
    }
  ];

  const fetchData = useFetchList<PoolUpdateDetail>(reportId ? API.REPORT.PREPORT_PROTOCOL_UPDATE(reportId) : "", {
    ...pageInfo
  });

  return (
    <Box>
      <PoolUpdateModal data={selectedValue} open={!!selectedValue} onClose={() => setSelectedValue(null)} />
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: t("common.poolUpdate"),
          count: fetchData.total
        }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
        }}
      />
    </Box>
  );
};

export default ProtocolUpdateTab;
