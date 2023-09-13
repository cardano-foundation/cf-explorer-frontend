import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

import {
  timeIconUrl,
  outputIconUrl,
  cubeIconUrl,
  slotIconUrl,
  exchageIconUrl,
  RewardIcon,
  User2
} from "src/commons/resources";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import DetailHeader from "src/components/commons/DetailHeader";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";

import { Output, Subtext, TitleCard } from "./styles";

interface EpochOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
  lastUpdated?: number;
}

const EpochOverview: React.FC<EpochOverviewProps> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const slot = data && data?.no === currentEpoch?.no ? currentEpoch.slot : MAX_SLOT_EPOCH;

  const listOverview = [
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.startTimestamp")} </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.startTime || "")
    },
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.endTimestamp")} </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.endTime || "")
    },
    {
      icon: outputIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.totalOutput")}</TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {formatADAFull(data?.outSum || 0)} <ADAicon />
        </Box>
      )
    },
    {
      icon: cubeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.blocks")}</TitleCard>
        </Box>
      ),
      value: data?.blkCount || 0
    },
    {
      icon: slotIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("common.slot")}</TitleCard>
        </Box>
      ),
      value: (
        <>
          {moment(formatDateTimeLocal(data?.endTime || "")).diff(moment()) > 0 ? slot : MAX_SLOT_EPOCH}
          <Subtext>/{MAX_SLOT_EPOCH}</Subtext>
        </>
      )
    },
    {
      icon: User2,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.uniqueAccounts")}</TitleCard>
        </Box>
      ),
      value: data?.account
    },
    {
      icon: exchageIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.transactionCount")}</TitleCard>
        </Box>
      ),
      value: data?.txCount
    },
    {
      icon: RewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.rewardsDistributed")}</TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.rewardsDistributed ? (
            <Output>
              {formatADAFull(data?.rewardsDistributed)}
              <ADAicon />
            </Output>
          ) : (
            t("common.notAvailable")
          )}
        </>
      )
    }
  ];
  return (
    <Box mb={3}>
      <DetailHeader
        loading={loading}
        listItem={listOverview}
        type="EPOCH"
        bookmarkData={data?.no?.toString()}
        title={t("head.page.epochDetails")}
        lastUpdated={lastUpdated}
        epoch={
          data && {
            no: data.no,
            slot: slot,
            status: data.status,
            endTime: data.endTime
          }
        }
      />
    </Box>
  );
};

export default EpochOverview;
