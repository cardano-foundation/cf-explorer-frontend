import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomIcon from "src/components/commons/CustomIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";

import { PoolUpdateModal } from "../../PoolUpdates/PoolUpdateModal";
import { ClickAbleLink } from "./styles";

const PoolUpdateTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { poolId = "" } = useParams<{ poolId: string }>();
  const history = useHistory();

  const [selectedValue, setSelectedValue] = useState<PoolUpdateDetail | null>(null);

  const { pageInfo, setSort } = usePageInfo();

  const columns: Column<PoolUpdateDetail>[] = [
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
        return formatDateTimeLocal(data.time);
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
      render(data) {
        return (
          <ClickAbleLink onClick={() => setSelectedValue(data)}>
            <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
          </ClickAbleLink>
        );
      }
    }
  ];

  const fetchData = useFetchList<PoolUpdateDetail>(poolId ? API.SPO_LIFECYCLE.POOL_UPDATE_LIST(poolId) : "", {
    ...pageInfo
  });

  return (
    <Box>
      <PoolUpdateModal data={selectedValue} open={!!selectedValue} onClose={() => setSelectedValue(null)} />
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("common.poolUpdate"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          }
        }}
      />
    </Box>
  );
};

export default PoolUpdateTab;
