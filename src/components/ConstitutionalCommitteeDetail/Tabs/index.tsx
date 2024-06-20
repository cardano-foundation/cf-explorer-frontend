import { useHistory, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { t } from "i18next";

import CustomAccordion, { TTab } from "src/components/commons/CustomAccordion";
import { CCGorvernanceVote } from "src/commons/resources";
import { details } from "src/commons/routers";
import DelegationGovernanceVotes from "src/components/GovernanceVotes";
import { VOTE_TYPE } from "src/commons/utils/constants";

const Tabs = () => {
  const history = useHistory();
  const { CCid } = useParams<{ CCid?: string }>();
  const onTabChange = (tab: string) => {
    history.replace(details.constitutionalCommitteeDetail(CCid || "", tab));
  };
  const constitutionalCommitteeTabs: TTab[] = [
    {
      key: "governanceVotes",
      icon: CCGorvernanceVote,
      children: <DelegationGovernanceVotes hash={CCid} type={VOTE_TYPE.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH} />,
      label: <Box data-testid="ns.script">{t("cc.governanceVotes")}</Box>
    }
  ];
  return (
    <Box mt={4} mb={3}>
      <CustomAccordion tabs={constitutionalCommitteeTabs} onTabChange={onTabChange} />
    </Box>
  );
};

export default Tabs;
