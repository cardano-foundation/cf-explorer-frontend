import { Box } from "@mui/material";
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

const filterOptions = [
  { label: "Latest - First", icon: <CustomIcon icon={ArrowFromTopIcon} width={20} />, value: "latest" },
  { label: "First - Latest", icon: <CustomIcon icon={ArrowFromBottomIcon} width={20} />, value: "first" },
  { label: "Date range", icon: <CustomIcon icon={CalenderIcon} width={20} />, value: "dateRange" },
  { label: "Search transaction", icon: <CustomIcon icon={SearchIcon} width={20} />, value: "search" },
];

interface Props {
  onSelect: (hash: string) => void;
}

const RecentDelegations: React.FC<Props> = ({ onSelect }) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined,
  });
  
  const { data, total } = useFetchList<DelegationItem>(stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : "", {
    page: 0,
    size: 1000,
    ...params
  });


  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Delegations</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>Showing {total} results</WrapFilterDescription>
          {params.fromDate && params.toDate && (
            <FilterDateLabel>
              Date range: {moment(params.fromDate).format("MM/DD/YYYY")} -{" "}
              {moment(params.toDate).format("MM/DD/YYYY")}
            </FilterDateLabel>
          )}
          <StackingFilter filterValue={params} onFilterValueChange={(params) => setParams((pre) => ({...pre,...params}))} />
        </Box>
      </Box>
      <GridBox>
        {data.map((item, index) => {
          return <OverviewStaking key={index} amount={item.outSum} time={item.time} hash={item.txHash} onClick={onSelect} />;
        })}
      </GridBox>
    </Box>
  );
};

export default RecentDelegations;
