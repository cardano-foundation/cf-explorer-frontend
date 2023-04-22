import { Box, Select } from "@mui/material";
import Card from "../commons/Card"
import OverviewStaking from "../commons/OverviewStaking";
import { GridBox, OutlineButton, SubmitButton, WrapFilterDescription } from "./styles";
import exchangeArrowIcon from "../../commons/resources/icons/exchange-alt.svg";
import filterIcon from "../../commons/resources/icons/filter.svg";
import moment from "moment";
import BasicPopover from "../commons/Popover";

interface DelegationOverviewListProps {

}

const DelegationOverviewList: React.FC<DelegationOverviewListProps> = ({ }) => {
  return (
    <Card
      title="Delegation"
      extra={
        <Box>
          <SubmitButton>
            <Box marginRight={"5px"} display={"flex"} alignItems={"center"}>
              <img src={exchangeArrowIcon} alt="exchangeArrowIcon" />
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
          <BasicPopover button={
            <OutlineButton>
              <Box marginRight={"5px"} display={"flex"} alignItems={"center"}>
                <img src={filterIcon} alt="exchangeArrowIcon" />
              </Box>
              Filter
            </OutlineButton>
          } content={"Hello"} />
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

export default DelegationOverviewList;
