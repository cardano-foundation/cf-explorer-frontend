import { Box } from "@mui/material";
import { ArrowFromTopIcon, CalenderPaleIcon, ExchangeIcon, InfoIcon, SearchNormalIcon } from "../../commons/resources";
import Card from "../commons/Card";
import FilterButton from "../commons/FilterButton";
import OverviewStaking from "../commons/OverviewStaking";
import { GridBox, SubmitButton, WrapFilterDescription } from "./styles";

interface RecentDelegationsProps {

}

const RecentDelegations: React.FC<RecentDelegationsProps> = ({ }) => {
  const filterOptions = [
    { label: "Latest - First", icon: <ArrowFromTopIcon />, value: "latest" },
    { label: "First - Latest", icon: <ArrowFromTopIcon style={{ transform: "rotate(180deg)" }} />, value: "first" },
    { label: "Date range", icon: <img src={CalenderPaleIcon} alt="arrowFromTop" style={{ transform: "scale(1.2)", padding: "0 2px" }} />, value: "dateRange" },
    { label: "Search transaction", icon: <SearchNormalIcon />, value: "search" },
  ]
  const handleFilter = (option: string) => {
    return;
  }
  return (
    <Card
      title={
        <Box display={"flex"} gap={1} alignItems={"center"}>
          Delegation
          <img src={InfoIcon} alt="info" style={{ transform: 'scale(1.2)' }} />
        </Box>
      }
      extra={
        <Box>
          <SubmitButton>
            <Box marginRight={"5px"} display={"flex"} alignItems={"center"}>
              <img src={ExchangeIcon} alt="exchangeArrowIcon" />
            </Box>
            ADA Transfers
          </SubmitButton>
        </Box>
      }
    >
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Delegations</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing 10 results
          </WrapFilterDescription>
          <FilterButton options={filterOptions} />
        </Box>
      </Box>
      <GridBox>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
        <OverviewStaking amount="2.174433" time={new Date()} txns="e0c5c3d4e5c3e04c2c3e04c2c3e04c2c3e04c2"></OverviewStaking>
      </GridBox>
    </Card>
  );
};

export default RecentDelegations;
