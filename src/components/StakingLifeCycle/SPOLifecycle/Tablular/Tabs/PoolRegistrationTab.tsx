import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import { formatADAFull, formatDateTimeLocal, formatHash } from "../../../../../commons/utils/helper";

import Table, { Column } from "../../../../commons/Table";
import { ADAValueFieldContainer, ADAValueLabel, ADAValueSubLabel, ClickAbleLink, VerticalRow } from "./styles";
import CustomIcon from "../../../../commons/CustomIcon";
import { ADAsigntIC } from "../../../../../commons/resources";
import { details } from "../../../../../commons/routers";
import CustomTooltip from "../../../../commons/CustomTooltip";
import { StyledLink } from "../../../../share/styled";

const PoolRegistrationTab = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });

  const [sort, setSort] = useState<string>("");

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
      title: (
        <Box>
          ADA Value
          <Box fontSize={"0.75rem"} fontWeight={'normal'}>Hold/Fees</Box>
        </Box>
      ),
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
      },
    },
    {
      key: "stakeKeys",
      title: "Owner",
      render(data) {
        return data.stakeKeys.map((item, index) => (
          <VerticalRow key={index}>
            <CustomTooltip title={item}>
              <StyledLink to={details.stake(item)}>{formatHash(item)}</StyledLink>
            </CustomTooltip>
          </VerticalRow>
        ));
      },
    },
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_LIST(poolId) : "",
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

export default PoolRegistrationTab;
