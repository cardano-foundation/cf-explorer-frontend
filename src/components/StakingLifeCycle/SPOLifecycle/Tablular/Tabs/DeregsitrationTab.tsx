import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { getShortHash } from "src/commons/utils/helper";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";

import { DeregistrationCertificateModal } from "../../Deregistration";

const DeregsitrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");
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
        return data.time;
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
          <CustomIcon icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : "",
    {
      ...params,
      sort
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
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size })
        }}
      />
      <DeregistrationCertificateModal data={selected} open={!!selected} handleCloseModal={() => setSelected(null)} />
    </Box>
  );
};

export default DeregsitrationTab;
