import { Box, Skeleton } from "@mui/material";
import CustomIcon from "../../../../commons/CustomIcon";
import { ArrowFromBottomIcon, ArrowFromTopIcon, CalenderIcon, SearchIcon } from "../../../../../commons/resources";
import { useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import { GridBox, WrapFilterDescription } from "./styles";
import Filter from "../../../../commons/Filter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { useState } from "react";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import { FilterDateLabel } from "../../RewardsWithdrawal/styles";
import moment from "moment";
import { EmptyRecord } from "../../../../commons/Table";

const filterOptions = [
  { label: "Latest - First", icon: <CustomIcon icon={ArrowFromTopIcon} width={20} />, value: "latest" },
  { label: "First - Latest", icon: <CustomIcon icon={ArrowFromBottomIcon} width={20} />, value: "first" },
  { label: "Date range", icon: <CustomIcon icon={CalenderIcon} width={20} />, value: "dateRange" },
  { label: "Search transaction", icon: <CustomIcon icon={SearchIcon} width={20} />, value: "search" },
];

interface Props {
  onSelect: (registration: DelegationItem) => void;
}

const RecentDelegations: React.FC<Props> = ({ onSelect }) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined,
  });

  const { data, total, loading, initialized, error } = useFetchList<DelegationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "",
    {
      page: 0,
      size: 1000,
      ...params,
    }
  );

  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Delegations</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {params.fromDate && params.toDate && (
            <FilterDateLabel>
              Date range: {moment(params.fromDate).format("MM/DD/YYYY")} - {moment(params.toDate).format("MM/DD/YYYY")}
            </FilterDateLabel>
          )}
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
                amount={item.outSum}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={onSelect}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </Box>
  );
};

export default RecentDelegations;
