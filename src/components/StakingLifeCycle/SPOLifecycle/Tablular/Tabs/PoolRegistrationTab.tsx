import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

import { RegistrationCertificateModal } from "../../Registration/RegistrationCertificateModal";

const PoolRegistrationTab = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);

  const columns: Column<SPORegistrationTabpular>[] = [
    {
      key: "txHash",
      title: "Transaction hash",
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
      title: "Created At",
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`bk.${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: "fee",
      title: (
        <Box>
          ADA Value
          <Box fontSize={"0.75rem"} fontWeight={"normal"}>
            Hold/Fees
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
      title: "Certificate",
      render: (data) => (
        <IconButton onClick={() => setSelected(data?.poolUpdateId || 0)}>
          <EyeIcon />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_LIST(poolId) : "",
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
          title: "Pool Registration",
          count: fetchData.total
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size })
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
