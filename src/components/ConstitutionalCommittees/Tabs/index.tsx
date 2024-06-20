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
    history.replace(details.CONSTITUIONAL_COMMITTEES(tab));
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
      children: (
        <Box px={1}>
          <DelegationGovernanceVotes type={VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH} />
        </Box>
      ),
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
