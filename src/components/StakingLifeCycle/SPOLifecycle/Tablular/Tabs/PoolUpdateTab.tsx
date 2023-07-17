import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { AdaValue } from "src/components/commons/ADAValue";

import { PoolUpdateModal } from "../../PoolUpdates/PoolUpdateModal";
import { ClickAbleLink } from "./styles";

const PoolUpdateTab = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
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
      title: "Fees",
      render(data) {
        return <AdaValue value={data.fee} />;
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

  const fetchData = useFetchList<PoolUpdateDetail>(poolId ? API.SPO_LIFECYCLE.POOL_UPDATE_LIST(poolId) : "", {
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

export default PoolUpdateTab;
