import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledLink } from "src/components/share/styled";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { ADAValueLabel, ClickAbleLink } from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import { ADAsigntIC, EyeIcon } from "src/commons/resources";
import useFetchList from "src/commons/hooks/useFetchList";
import { PoolUpdateModal } from "src/components/StakingLifeCycle/SPOLifecycle/PoolUpdates/PoolUpdateModal";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

const ProtocolUpdateTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [selectedValue, setSelectedValue] = useState<PoolUpdateDetail | null>(null);
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");

  const columns: Column<PoolUpdateDetail>[] = [
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
      title: "Fees",
      render(data) {
        return (
          <ADAValueLabel>
            {formatADAFull(data.fee)} <CustomIcon icon={ADAsigntIC} width={12} />
          </ADAValueLabel>
        );
      }
    },
    {
      key: "Certificate",
      title: "Certificate",
      render(data) {
        return (
          <ClickAbleLink onClick={() => setSelectedValue(data)}>
            <EyeIcon />
          </ClickAbleLink>
        );
      }
    }
  ];

  const fetchData = useFetchList<PoolUpdateDetail>(reportId ? API.REPORT.PREPORT_PROTOCOL_UPDATE(reportId) : "", {
    ...params,
    sort
  });

  return (
    <Box>
      <PoolUpdateModal data={selectedValue} open={!!selectedValue} onClose={() => setSelectedValue(null)} />
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: "Pool update",
          count: fetchData.total
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default ProtocolUpdateTab;
