import { Box, Skeleton, useTheme } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import {
  CCDetailRegistrared,
  CCDetailRegistrationInformation,
  CCDetailVotingParticipation,
  CCStatusHistory,
  DropdownIcon,
  LifetimeVoteDrepIcon,
  TimeIconComponent
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, formatPercent } from "src/commons/utils/helper";
import { OverralCard } from "src/components/ConstitutionalCommittees/Overrall";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import DetailHeader from "src/components/commons/DetailHeader";
import { VoteRate, voteOption } from "src/pages/DrepDetail";
import { StyledMenuItem, StyledSelect, TitleCard } from "src/pages/DrepDetail/styles";

const Overview = ({ data, loading }: { data: CCDetailOVerview | null; loading: boolean }) => {
  const theme = useTheme();
  const { CCid } = useParams<{ CCid?: string }>();
  const { isLaptop } = useScreen();
  const [typeVote, setTypeVote] = useState("Default");

  const { data: dataChard, loading: loadingChard } = useFetch<DrepOverviewChart>(
    `${API.COMMITTEE.CC_DETAIL_CHART(CCid || "")}?govActionType=${typeVote === "Default" ? "ALL" : typeVote}`
  );

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
      icon: CCStatusHistory,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.statusHistory")} </TitleCard>
        </Box>
      ),
      value: <Box>{t("common.N/A")}</Box>
    },
    {
      icon: CCDetailRegistrationInformation,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.detail.resignationInformation")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.resignedAt !== null ? data?.resignedAt : t("common.na")}</Box>
    },
    {
      icon: LifetimeVoteDrepIcon,
      title: (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          width={"100%"}
          sx={{
            flexDirection: "row",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "flex-start"
            }
          }}
        >
          <TitleCard display={"flex"} alignItems="center">
            {t("drep.lifetimeVotes")}
          </TitleCard>
          <StyledSelect
            value={typeVote}
            onChange={(event) => {
              setTypeVote(event.target?.value as string);
            }}
            size="small"
            IconComponent={DropdownIcon}
            sx={{
              bgcolor: theme.palette.primary[100],
              width: "100%",
              maxWidth: "200px"
            }}
            MenuProps={{
              style: { zIndex: 1303 },
              MenuListProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                }
              },
              PaperProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`,
                  "& .MuiMenuItem-root": {
                    "&.Mui-selected": {
                      backgroundColor: ({ palette }) => `${palette.secondary[0]} !important` // Màu nền cho option được chọn
                    }
                  }
                }
              }
            }}
          >
            {voteOption.map((voteType, idx) => {
              if (voteType.value === "Default") {
                return (
                  <Box
                    component={StyledMenuItem}
                    key={idx}
                    fontSize={12}
                    color={theme.palette.secondary.light}
                    value={voteType.value}
                    display={"none"}
                  >
                    {voteType.title}
                  </Box>
                );
              }

              return (
                <Box
                  component={StyledMenuItem}
                  key={idx}
                  fontSize={12}
                  color={theme.palette.secondary.light}
                  value={voteType.value}
                >
                  {voteType.title}
                </Box>
              );
            })}
          </StyledSelect>
        </Box>
      ),
      value: (
        <Box>
          <VoteRate data={dataChard} loading={loadingChard} />
        </Box>
      )
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
              <Box
                color={`${theme.palette.primary.main} !important`}
                width={"min(560px,60vw)"}
                fontWeight={"bold"}
                fontSize={"16px"}
                component={Link}
                to={details.smartContract(data?.scriptHash)}
              >
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
