import { Box, CircularProgress } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

import { details } from "src/commons/routers";
import { CCGorvernanceVote, CClistMembers, PencilIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import CustomAccordion, { TTab } from "../commons/CustomAccordion";
import Description from "./Description";
import OverviewHeader from "./OverviewHeader";
import VotesOverview from "./VotesOverview";
import CreatedBy from "./CreatedBy";

export default function GovernanceActionDetailsComponent() {
  const history = useHistory();

  const pathArray = history.location.pathname.split("/").filter(Boolean);
  const { txHash, index } = useParams<{ txHash: string; index: string }>();
  const { data, loading } = useFetch<OverviewGovActions>(API.OVERVIEW_GOV_ACTIONS.OVERVIEW(txHash, index));
  const onTabChange = (tab: string) => {
    history.replace(details.overviewGovernanceAction(pathArray[1], pathArray[2], tab));
  };
  if (loading)
    return (
      <Box width={"100%"} height={"100%"}>
        <CircularProgress />
      </Box>
    );
  const GovernanceActionDetailsTabs: TTab[] = [
    {
      key: "createBy",
      icon: PencilIcon,
      children: <CreatedBy anchorHash={data?.anchorHash ?? ""} anchorUrl={data?.anchorUrl ?? ""} />,
      label: <Box>Created by</Box>
    },
    {
      key: "description",
      icon: CClistMembers,
      children: <Description data={data} />,
      label: <Box>Description</Box>
    },
    {
      key: "voteOverview",
      icon: CCGorvernanceVote,
      children: <VotesOverview />,
      label: <Box>Votes Overview</Box>
    }
  ];
  return (
    <Box>
      <OverviewHeader data={data} />
      <CustomAccordion tabs={GovernanceActionDetailsTabs} onTabChange={onTabChange} />
    </Box>
  );
}
