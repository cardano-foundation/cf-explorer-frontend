import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { t } from "i18next";

import CustomAccordion, { TTab } from "src/components/commons/CustomAccordion";
import { CClistMembers, CCGorvernanceVote, CCHistoryStatus } from "src/commons/resources";
import { details } from "src/commons/routers";
import DelegationGovernanceVotes from "src/components/GovernanceVotes";
import { VOTE_TYPE } from "src/commons/utils/constants";

import Members from "./Members";
import StatusHistory from "./StatusHistory";

const Tabs = () => {
  const history = useHistory();
  const onTabChange = (tab: string) => {
    history.replace(details.constitutionalCommittees(tab));
  };
  const constitutionalCommitteeTabs: TTab[] = [
    {
      key: "listMembers",
      icon: CClistMembers,
      children: <Members />,
      label: <Box data-testid="ns.mintBurnPolicy">{t("cc.listMembers")}</Box>
    },
    {
      key: "governanceVotes",
      icon: CCGorvernanceVote,
      children: <DelegationGovernanceVotes hash={"drepId"} type={VOTE_TYPE.DREP_KEY_HASH} />,
      label: <Box data-testid="ns.script">{t("cc.governanceVotes")}</Box>
    },
    {
      key: "statusHistory",
      icon: CCHistoryStatus,
      children: <StatusHistory />,
      label: <Box data-testid="ns.script">{t("cc.statusHistory")}</Box>
    }
  ];
  return (
    <Box mt={4} mb={3}>
      <CustomAccordion tabs={constitutionalCommitteeTabs} onTabChange={onTabChange} />
    </Box>
  );
};

export default Tabs;
