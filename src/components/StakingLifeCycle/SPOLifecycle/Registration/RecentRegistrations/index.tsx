import { Box } from "@mui/material";
import CustomIcon from "../../../../commons/CustomIcon";
import { ArrowFromBottomIcon, ArrowFromTopIcon, CalenderIcon, SearchIcon } from "../../../../../commons/resources";
import { useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import { GridBox, WrapFilterDescription } from "./styles";
import Filter from "../../../../commons/Filter";
import OverviewStaking from "../../../../commons/OverviewStaking";

const filterOptions = [
  { label: "Latest - First", icon: <CustomIcon icon={ArrowFromTopIcon} width={20} />, value: "latest" },
  { label: "First - Latest", icon: <CustomIcon icon={ArrowFromBottomIcon} width={20} />, value: "first" },
  { label: "Date range", icon: <CustomIcon icon={CalenderIcon} width={20} />, value: "dateRange" },
  { label: "Search transaction", icon: <CustomIcon icon={SearchIcon} width={20} />, value: "search" },
];

interface Props {
  onSelect: (hash: string) => void;
}

const RecentRegistrations: React.FC<Props> = ({ onSelect }) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data, total } = useFetchList<RegistrationItem>(poolId ? API.STAKE_LIFECYCLE.REGISTRATION(poolId) : "", {
    page: 0,
    size: 1000,
  });

  const handleFilter = (option: string) => {
    return;
  };

  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Registrations</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>Showing {total} results</WrapFilterDescription>
          <Filter options={filterOptions} />
        </Box>
      </Box>
      <GridBox>
        {data.map(item => {
          return <OverviewStaking amount={item.deposit} time={item.time} hash={item.txHash} onClick={onSelect} />;
        })}
      </GridBox>
    </Box>
  );
};

export default RecentRegistrations;
