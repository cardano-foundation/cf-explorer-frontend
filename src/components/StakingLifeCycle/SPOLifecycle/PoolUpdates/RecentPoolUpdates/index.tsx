import { Box, Skeleton } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord } from "../../../../commons/Table";
import { GridBox, WrapFilterDescription, StyledList, StyledContainer } from "./styles";
import { FilterDateLabel } from "../../../DelegatorLifecycle/Delegation/styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";
import { details } from "../../../../../commons/routers";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";
import { DATETIME_PARTTEN } from "~/components/StackingFilter/DateRangeModal";

const PoollUpdatesList = ({ onSelect }: { onSelect: (pool: PoolUpdateItem | null) => void }) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { data, total, loading, initialized, error } = useFetchList<PoolUpdateItem>(
    API.SPO_LIFECYCLE.POOL_UPDATE(poolId),
    {
      page: 0,
      size: 1000,
      ...params
    }
  );
  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (poolUpdated: PoolUpdateItem) => {
    history.push(details.spo(poolId, "timeline", "pool-updates", poolUpdated.txHash));
  };

  useUpdateEffect(() => {
    if (data && data.length && data.length === 1) {
      handleSelect(data[0]);
    }
  }, [JSON.stringify(data)]);

  const filterLabel = useMemo(() => {
    const sortArr = params.sort && params.sort.split(",");
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params.sort && sortArr && params.sort.length >= 2)
      return `${sortArr[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);

  if (txHash) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>Recent Updates</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              });
            }}
          />
        </Box>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {data.map((item, ii) => {
          return (
            <OverviewStaking
              key={ii}
              item={item}
              onClick={handleSelect}
              hash={item.txHash}
              amount={item.fee}
              time={item.time}
            />
          );
        })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </StyledContainer>
  );
};
export default PoollUpdatesList;
