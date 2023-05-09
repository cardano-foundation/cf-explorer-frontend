import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Table, { Column } from "../../commons/Table";
import CustomTooltip from "../../commons/CustomTooltip";
import { StyledLink } from "../../share/styled";
import { formatADAFull, formatDateTimeLocal, formatHash } from "../../../commons/utils/helper";
import { ADAValueLabel, ClickAbleLink } from "../../StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomIcon from "../../commons/CustomIcon";
import { ADAsigntIC } from "../../../commons/resources";
import useFetchList from "../../../commons/hooks/useFetchList";
import { PoolUpdateModal } from "../../StakingLifeCycle/SPOLifecycle/PoolUpdates";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";


const ProtocolUpdateTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [selectedValue, setSelectedValue] = useState<PoolUpdateDetail | null>(null);
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });

  const [sort, setSort] = useState<string>("");

  const columns: Column<PoolUpdateDetail>[] = [
    {
      key: "txHash",
      title: "Transaction hash",
      render(data) {
        return (
          <CustomTooltip title={data.txHash}>
            <StyledLink to={details.transaction(data.txHash)}>{formatHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      },
    },
    {
      key: "time",
      title: "Timestamp",
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`bk.${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      },
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
      },
    },
    {
      key: "update",
      title: "Update",
      render(data) {
        return <ClickAbleLink onClick={() => setSelectedValue(data)}>Certificate Update</ClickAbleLink>;
      },
    },
  ];

  const fetchData = useFetchList<PoolUpdateDetail>(reportId ? API.REPORT.PREPORT_PROTOCOL_UPDATE(reportId) : "", {
    ...params,
    sort,
  });

  return (
    <Box>
      <PoolUpdateModal
        data={selectedValue}
        open={!!selectedValue}
        handleCloseModal={() => {
          setSelectedValue(null);
        }}
      />
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: "Pool update",
          count: fetchData.total,
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size }),
        }}
      />
    </Box>
  );
};

export default ProtocolUpdateTab;