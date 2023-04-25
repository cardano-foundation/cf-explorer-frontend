import { Box, Skeleton } from "@mui/material";
import CustomIcon from "../../../../commons/CustomIcon";
import { ArrowFromBottomIcon, ArrowFromTopIcon, CalenderIcon, SearchIcon } from "../../../../../commons/resources";
import { useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import { GridBox, WrapFilterDescription } from "./styles";
import Filter from "../../../../commons/Filter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord } from "../../../../commons/Table";

const filterOptions = [
  { label: "Latest - First", icon: <CustomIcon icon={ArrowFromTopIcon} width={20} />, value: "latest" },
  { label: "First - Latest", icon: <CustomIcon icon={ArrowFromBottomIcon} width={20} />, value: "first" },
  { label: "Date range", icon: <CustomIcon icon={CalenderIcon} width={20} />, value: "dateRange" },
  { label: "Search transaction", icon: <CustomIcon icon={SearchIcon} width={20} />, value: "search" },
];

interface Props {
  onSelect: (ưithdraw: WithdrawItem) => void;
}

const RecentWithdraws: React.FC<Props> = ({ onSelect }) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, total, loading, initialized, error } = useFetchList<WithdrawItem>(
    stakeId ? API.STAKE_LIFECYCLE.WITHDRAW(stakeId) : "",
    { page: 0, size: 1000 }
  );

  const handleFilter = (option: string) => {
    return;
  };

  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Withdraws</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>Showing {total} results</WrapFilterDescription>
          <Filter options={filterOptions} />
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
              <OverviewStaking amount={item.value} item={item} time={item.time} hash={item.txHash} onClick={onSelect} />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </Box>
  );
};

export default RecentWithdraws;
