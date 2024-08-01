import { Box, Chip, Skeleton, useTheme } from "@mui/material";
import { t } from "i18next";
import { stringify } from "querystring";
import { useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { InfoTitle, InfoValue } from "src/components/DelegationDetail/DelegationDetailInfo/styles";
import { VoteRate } from "src/components/GovernanceVotes/OverallVote";

type VoteType = "SPOs" | "DReps" | "CC";

const listVotes = ["SPOs", "DReps", "CC"];

const voterType = {
  SPOs: "STAKING_POOL_KEY_HASH",
  DReps: "DREP_KEY_HASH",
  CC: "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
};

export default function VoteSubmitted() {
  const [selectVote, setSelectVote] = useState<VoteType | "">("SPOs");

  const { txHash, index } = useParams<{ txHash: string; index: string }>();

  const theme = useTheme();

  const { data: dataChart, loading: loadingChart } = useFetch<GovernanceVoteChart>(
    selectVote
      ? `${API.POOL_CERTIFICATE.POOL_CHART}?${stringify({
          txHash: txHash,
          index: index || 0,
          voterType: voterType[selectVote as VoteType]
        })}`
      : ""
  );

  const filterDataChart = (selectVote: string) => {
    switch (selectVote) {
      case "SPOs":
        return {
          voterType: "STAKING_POOL_KEY_HASH",
          numberOfYesVote: dataChart?.totalYesVoteStake,
          numberOfNoVotes: dataChart?.totalNoVoteStake,
          numberOfAbstainVotes: dataChart?.abstainVoteStake,
          totalVote: dataChart?.activeVoteStake,
          threshold: dataChart?.threshold
        };

      case "DReps":
        return {
          voterType: "DREP_KEY_HASH",
          numberOfYesVote: dataChart?.totalYesVoteStake,
          numberOfNoVotes: dataChart?.totalNoVoteStake,
          numberOfAbstainVotes: dataChart?.abstainVoteStake,
          totalVote: dataChart?.activeVoteStake,
          threshold: dataChart?.threshold
        };
      case "CC":
        return {
          voterType: "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH",
          numberOfYesVote: dataChart?.yesCcMembers,
          numberOfNoVotes: dataChart?.noCcMembers,
          numberOfAbstainVotes: dataChart?.abstainCcMembers,
          totalVote: dataChart?.ccMembers,
          threshold: dataChart?.threshold
        };
      default:
        return dataChart;
    }
  };

  const disableButtonSelect = (key: string) => {
    if (key === "SPOs") return true;
    if (key === "CC") return true;
    return false;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <InfoTitle
        paddingBottom="60px"
        display="flex"
        justifyContent="space-between"
        gap={"15px"}
        alignItems="center !important"
      >
        <Box sx={{ fontSize: "16px", fontWeight: "700", color: theme.palette.secondary.main }}>Vote submitted</Box>

        <Box display="flex" gap="8px" flexWrap="inherit">
          {listVotes.map((i) => (
            <CustomTooltip
              key={i}
              title={
                disableButtonSelect(i) ? (
                  <Box maxWidth={"min(340px,80vw) !important"}>
                    {disableButtonSelect(i) ? (i === "SPOs" ? t("drep.SPODisable") : t("drep.CCDisable")) : ""}
                  </Box>
                ) : undefined
              }
            >
              <Box display={"inline-block"}>
                <Chip
                  disabled={disableButtonSelect(i) || loadingChart}
                  sx={{
                    fontWeight: 500,
                    fontSize: "12px",
                    background:
                      selectVote === i
                        ? theme.palette.primary[200]
                        : theme.isDark
                        ? theme.palette.primary[500]
                        : theme.palette.primary[100],
                    border: `1px solid ${selectVote === i ? theme.palette.primary.main : theme.palette.secondary[600]}`,
                    color:
                      selectVote === i
                        ? theme.palette.secondary.main
                        : theme.isDark
                        ? theme.palette.secondary.main
                        : theme.palette.secondary[600],
                    "&:hover": {
                      background: theme.palette.primary[200]
                    }
                  }}
                  label={i}
                  onClick={() => setSelectVote(i as VoteType)}
                />
              </Box>
            </CustomTooltip>
          ))}
        </Box>
      </InfoTitle>
      <InfoValue data-testid="governance.votesValue" width={"100%"}>
        <Box pr="5px">
          {loadingChart ? (
            <Box
              component={Skeleton}
              variant="rectangular"
              sx={{
                height: 150,
                [theme.breakpoints.down("sm")]: {
                  height: 300
                },
                bgcolor: theme.isDark ? theme.palette.secondary[600] : ""
              }}
              borderRadius={2}
            />
          ) : (
            <Box textAlign={"center"}>
              <VoteRate data={filterDataChart(selectVote) as VotingChart} selectedVote={selectVote} />
            </Box>
          )}
        </Box>
      </InfoValue>
    </Box>
  );
}
