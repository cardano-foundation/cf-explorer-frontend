import { Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { ADAsigntIC, EyeIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, formatHash } from "../../../commons/utils/helper";
import { RegistrationCertificateModal } from "../../StakingLifeCycle/SPOLifecycle/Registration";
import {
  ADAValueFieldContainer,
  ADAValueLabel,
  ADAValueSubLabel
} from "../../StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomIcon from "../../commons/CustomIcon";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";
import { ReportGeneratedPoolDetailContext } from "..";

const PoolRegistrationTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const { poolId } = useContext(ReportGeneratedPoolDetailContext);
  const [params, setParams] = useState({
    page: 0,
    size: 10
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
            <StyledLink to={details.transaction(data.txHash)}>{formatHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      }
    },
    {
      key: "time",
      title: "Timestamp",
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
              {formatADAFull(data.totalFee)} <CustomIcon icon={ADAsigntIC} width={12} />{" "}
            </ADAValueLabel>
            <ADAValueSubLabel>
              {formatADAFull(data.deposit)} <CustomIcon icon={ADAsigntIC} width={11} /> / {formatADAFull(data.fee)}
              <CustomIcon icon={ADAsigntIC} width={11} />{" "}
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
          <EyeIcon style={{ transform: "scale(.8)" }} />
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
        handleCloseModal={() => setSelected(null)}
        poolId={poolId}
      />
    </Box>
  );
};

export default PoolRegistrationTab;
