import { Box, Skeleton } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord } from "../../../../commons/Table";
import { GridBox, WrapFilterDescription } from "./styles";
import { FilterDateLabel } from "../../../DelegatorLifecycle/Delegation/styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";
import { details } from "../../../../../commons/routers";

interface Props {
  onSelect: (registration: SPODeregistration | null) => void;
}

const RecentDeregistrations: React.FC<Props> = ({ onSelect }) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined,
  });
  const { data, total, loading, initialized, error } = useFetchList<SPODeregistration>(
    poolId ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : "",
    {
      page: 0,
      size: 1000,
      ...params,
    }
  );

  useEffect(() => {
    const currentItem = data.find(item => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (deregistration: SPODeregistration) => {
    history.push(details.spo(poolId, "timeline", "deregistration", deregistration.txHash));
  };

  const filterLabel = useMemo(() => {
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment(params.fromDate).format("MM/DD/YYYY")} - ${moment(params.toDate).format(
        "MM/DD/YYYY"
      )}`;
    if (params.sort && params.sort.length >= 2)
      return `${params.sort[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);

  if (txHash) return null;

  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <DescriptionText>Recent Deregistration</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={params =>
              setParams(pre => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params,
              }))
            }
          />
        </Box>
      </Box>
      <GridBox>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}

        {!loading &&
          data.map(item => {
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

export default RecentDeregistrations;
