import { Box, Skeleton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { GridBox, WrapFilterDescription } from "./styles";

import moment from "moment";
import { EmptyRecord } from "../../../../commons/Table";
import { FilterDateLabel } from "../styles";
import { DATETIME_PARTTEN } from "../../../../StackingFilter/DateRangeModal";
import { DescriptionText } from "../../styles";
import { details } from "../../../../../commons/routers";
import { useUpdateEffect } from "react-use";

interface Props {
  onSelect: (delegation: DelegationItem | null) => void;
}

const RecentDelegations: React.FC<Props> = ({ onSelect }) => {
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();
  const history = useHistory();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });

  const { data, total, loading, initialized, error } = useFetchList<DelegationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "",
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

  const handleSelect = (delegation: DelegationItem) => {
    history.push(details.staking(stakeId, "timeline", "delegation", delegation.txHash));
  };

  useUpdateEffect(() => {
    if (data && data.length && data.length === 1) {
      handleSelect(data[0]);
    }
  }, [JSON.stringify(data)]);

  const filterLabel = useMemo(() => {
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params.sort && params.sort.length >= 2)
      return `${params.sort[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);

  if (txHash) return null;

  return (
    <Box marginTop='32px'>
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <DescriptionText>Recent Delegations</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
           <StackingFilter
              filterValue={params}
              onFilterValueChange={(params) =>
                setParams(() => ({
                  fromDate: undefined,
                  sort: undefined,
                  toDate: undefined,
                  txHash: undefined,
                  ...params
                }))
              }
            />
        </Box>
      </Box>
      <GridBox>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant='rectangular' width={300} height={185} />
          ))}
        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.fee}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={handleSelect}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </Box>
  );
};

export default RecentDelegations;
