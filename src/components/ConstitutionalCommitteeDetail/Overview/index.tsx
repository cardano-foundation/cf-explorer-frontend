import { Box, useTheme } from "@mui/material";
import { t } from "i18next";

import {
  CCDetailLifetimeVotes,
  CCDetailRegistrared,
  CCDetailRegistrationInformation,
  CCDetailVotingParticipation,
  CCStatusHistory,
  TimeIconComponent
} from "src/commons/resources";
import { OverralCard } from "src/components/ConstitutionalCommittees/Overrall";
import CopyButton from "src/components/commons/CopyButton";
import DetailHeader from "src/components/commons/DetailHeader";
import { TitleCard } from "src/pages/DrepDetail/styles";

const Overview = () => {
  const theme = useTheme();

  const listOverview = [
    {
      icon: CCDetailRegistrared,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.registered")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.termDuration")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCDetailVotingParticipation,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.votingParticipation")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCDetailLifetimeVotes,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.lifetimeVotes")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCStatusHistory,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.statusHistory")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCDetailRegistrationInformation,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.registrationInformation")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {},
    {}
  ];

  return (
    <Box>
      <DetailHeader
        data-testid="transactionOverview.detailHeader"
        type="BLOCK"
        title={<Box mr={2}>{t("cc.detail.comitteeMember")}</Box>}
        subTitle={
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box>{t("cc.detail.publicKey")}:</Box>
              <Box color={theme.palette.primary.main} fontWeight={"bold"} fontSize={"16px"}>
                d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250
                {/* <DynamicEllipsisText
                sx={{ transform: "translateY(0px)" }}
                value="d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250"
                isCopy
                /> */}
              </Box>
              <CopyButton text="d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250" />
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box>{t("glossary.scriptHash")}:</Box>
              <Box color={theme.palette.primary.main} fontWeight={"bold"} fontSize={"16px"}>
                77b0a93c26ac65be36e9a9f220f9a43cbc57d705fc5d8f1de5fdeea1
                {/* <DynamicEllipsisText
                sx={{ transform: "translateY(0px)" }}
                value="d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250"
                isCopy
                /> */}
              </Box>
              <CopyButton text="77b0a93c26ac65be36e9a9f220f9a43cbc57d705fc5d8f1de5fdeea1" />
            </Box>
          </Box>
        }
        stakeKeyStatus="ACTIVE"
        loading={false}
      />
      <OverralCard listItem={listOverview} />
    </Box>
  );
};

export default Overview;
