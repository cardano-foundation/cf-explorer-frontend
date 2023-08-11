import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton } from "@mui/material";

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

import { ReportGeneratedPoolDetailContext } from "..";

const PoolRegistrationTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const { poolId } = useContext(ReportGeneratedPoolDetailContext);
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const columns: Column<SPORegistrationTabpular>[] = [
    {
      key: "txHash",
      title: "Transaction Hash",
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
      title: "ADA Value",
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
      title: "Certificate",
      render: (data) => (
        <IconButton onClick={() => setSelected(data?.poolUpdateId || 0)}>
          <EyeIcon />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(reportId ? API.REPORT.PREPORT_REGISTRATIONS(reportId) : "", {
    ...params,
    sort
  });

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
