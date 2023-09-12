import { Box, IconButton } from "@mui/material";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";

import { DeregistrationCertificateModal } from "../../Deregistration";

const DeregsitrationTab = () => {
  const { t } = useTranslation();
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
            <AdaValue value={data.poolHold ? new BigNumber(data.poolHold).minus(data.fee).toString() : 0} />
            <TableSubTitle>
              <Box display="flex" mt={1} alignItems="center" lineHeight="1">
                {formatADAFull(data.poolHold)}&nbsp;
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
        <IconButton onClick={() => setSelected(data)}>
          <EyeIcon />
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
