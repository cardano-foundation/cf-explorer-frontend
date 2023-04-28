import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import { formatADAFull, formatHash } from "../../../../../commons/utils/helper";
import Table, { Column } from "../../../../commons/Table";
import { ADAValueFieldContainer, ADAValueLabel, ADAValueSubLabel, ClickAbleLink } from "./styles";
import CustomIcon from "../../../../commons/CustomIcon";
import { ADAsigntIC } from "../../../../../commons/resources";

const DeregsitrationTab = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });

  const [sort, setSort] = useState<string>("");

  const columns: Column<SPODeregistrationTabpular>[] = [
    {
      key: "txHash",
      title: "Transaction hash",
      render(data) {
        return <ClickAbleLink>{formatHash(data.txHash)}</ClickAbleLink>;
      },
    },
    {
      key: "time",
      title: "Timestamp",
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return data.time;
      },
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
              {formatADAFull(data.poolHold)} <CustomIcon icon={ADAsigntIC} width={1} /> {formatADAFull(data.fee)}{" "}
              <CustomIcon icon={ADAsigntIC} width={12} />{" "}
            </ADAValueSubLabel>
          </ADAValueFieldContainer>
        );
      },
    },
    {
      key: "owner",
      title: "Owner",
      render(data) {
        return data.stakeKeys.map((item, index) => <ClickAbleLink key={index}>{formatHash(item)}</ClickAbleLink>);
      },
    },
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : "",
    {
      ...params,
      sort,
    }
  );

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: "Pool Registration",
          count: fetchData.total,
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page, size }),
        }}
      />
    </Box>
  );
};

export default DeregsitrationTab;
