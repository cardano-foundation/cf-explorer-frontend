import { Box, Skeleton, useTheme } from "@mui/material";
import { t } from "i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  CCDetailLifetimeVotes,
  CCDetailRegistrared,
  CCDetailRegistrationInformation,
  CCDetailVotingParticipation,
  CCStatusHistory,
  TimeIconComponent
} from "src/commons/resources";
import { formatDateTimeLocal, formatPercent } from "src/commons/utils/helper";
import { OverralCard } from "src/components/ConstitutionalCommittees/Overrall";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import DetailHeader from "src/components/commons/DetailHeader";
import { TitleCard } from "src/pages/DrepDetail/styles";

const Overview = ({ data, loading }: { data: CCDetailOVerview | null; loading: boolean }) => {
  const theme = useTheme();
  const { isLaptop } = useScreen();
  const listOverview = [
    {
      icon: CCDetailRegistrared,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.registered")} </TitleCard>
        </Box>
      ),
      value: (
        <Box>
          <DatetimeTypeTooltip>{formatDateTimeLocal(data?.registeredAt || "")}</DatetimeTypeTooltip>{" "}
        </Box>
      )
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.termDuration")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.activeEpoch !== null ? `${data?.activeEpoch} - ${data?.expiredEpoch}` : t("common.na")}</Box>
    },
    {
      icon: CCDetailVotingParticipation,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.votingParticipation")} </TitleCard>
        </Box>
      ),
      value: <Box>{formatPercent(data?.votingParticipation || 0)}</Box>
    },
    {
      icon: CCDetailLifetimeVotes,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.lifetimeVotes")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.termDuration || 0}</Box>
    },
    {
      icon: CCStatusHistory,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.statusHistory")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.status || 0}</Box>
    },
    {
      icon: CCDetailRegistrationInformation,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.registrationInformation")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.resignedAt !== null ? data?.resignedAt : t("common.na")}</Box>
    },
    {},
    {}
  ];
  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={"100px"} style={{ borderRadius: 10, marginTop: 8 }} />
        <Box mb={2}>
          <Skeleton variant="rectangular" height={"307px"} style={{ borderRadius: 10, marginTop: 8 }} />
        </Box>
      </Box>
    );
  }
  return (
    <Box mb={3}>
      <DetailHeader
        data-testid="transactionOverview.detailHeader"
        type="BLOCK"
        title={<Box mr={2}>{t("cc.detail.comitteeMember")}</Box>}
        subTitle={
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box>{t("cc.detail.publicKey")}:</Box>
              <Box color={theme.palette.primary.main} width={"min(560px,60vw)"} fontWeight={"bold"} fontSize={"16px"}>
                <DynamicEllipsisText
                  sx={{ transform: "translateY(0px)" }}
                  value={data?.publicKey || ""}
                  isCopy
                  isTooltip
                />
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box>{t("glossary.scriptHash")}:</Box>
              <Box color={theme.palette.primary.main} width={"min(560px,60vw)"} fontWeight={"bold"} fontSize={"16px"}>
                <DynamicEllipsisText
                  sx={{ transform: "translateY(0px)" }}
                  value={data?.scriptHash || ""}
                  isCopy
                  isTooltip
                />
              </Box>
            </Box>
          </Box>
        }
        stakeKeyStatus={data?.status}
        loading={false}
      />
      <OverralCard listItem={isLaptop ? listOverview.filter((item) => Object.keys(item).length !== 0) : listOverview} />
    </Box>
  );
};

export default Overview;
