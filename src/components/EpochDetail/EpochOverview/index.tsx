import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

import {
  TimeIconComponent,
  OutputIcon,
  CubeIconComponent,
  SlotIcon,
  User2Component,
  ExchageIcon,
  RewardIconComponent
} from "src/commons/resources";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import DetailHeader from "src/components/commons/DetailHeader";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

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
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.startTimeTitle" mr={1}>
            {t("glossary.startTimestamp")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <DatetimeTypeTooltip>
          <Box display={"inline"} data-testId="epoch.overview.startTimeValue">
            {formatDateTimeLocal(data?.startTime || "")}
          </Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.endTimeTitle" mr={1}>
            {t("glossary.endTimestamp")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <DatetimeTypeTooltip data-testId="epoch.overview.endTimeValue">
          <Box display={"inline"} data-testId="epoch.overview.endTimeValue">
            {formatDateTimeLocal(data?.endTime || "")}
          </Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: OutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.totalOutputTitle" mr={1}>
            {t("glossary.totalOutput")}
          </TitleCard>
        </Box>
      ),
      value: (
        <Box data-testId="epoch.overview.totalOutputValue" component={"span"}>
          {formatADAFull(data?.outSum || 0)} <ADAicon />
        </Box>
      )
    },
    {
      icon: CubeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.BlocksTitle" mr={1}>
            {t("glossary.blocks")}
          </TitleCard>
        </Box>
      ),
      value: <div data-testId="epoch.overview.BlocksValue">{data?.blkCount || 0}</div>
    },
    {
      icon: SlotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.slotTitle" mr={1}>
            {t("common.slot")}
          </TitleCard>
        </Box>
      ),
      value: (
        <div data-testId="epoch.overview.slotValue">
          {moment(formatDateTimeLocal(data?.endTime || "")).diff(moment()) > 0 ? slot : MAX_SLOT_EPOCH}
          <Subtext>/{MAX_SLOT_EPOCH}</Subtext>
        </div>
      )
    },
    {
      icon: User2Component,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.uniqueAccountsTitle" mr={1}>
            {t("glossary.uniqueAccounts")}
          </TitleCard>
        </Box>
      ),
      value: <div data-testId="epoch.overview.uniqueAccountsTitle">{data?.account}</div>
    },
    {
      icon: ExchageIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testId="epoch.overview.transactionCountTitle" mr={1}>
            {t("glossary.transactionCount")}
          </TitleCard>
        </Box>
      ),
      value: <div data-testId="epoch.overview.transactionCountValue">{data?.txCount}</div>
    },
    {
      icon: RewardIconComponent,
      title: (
        <Box data-testId="epoch.overview.rewardsDistributedTitle" display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.rewardsDistributed")}</TitleCard>
        </Box>
      ),
      value: (
        <div data-testId="epoch.overview.rewardsDistributedValue">
          {data?.rewardsDistributed ? (
            <Output>
              {formatADAFull(data?.rewardsDistributed)}
              <ADAicon />
            </Output>
          ) : (
            t("common.N/A")
          )}
        </div>
      )
    }
  ];
  return (
    <Box mb={3}>
      <DetailHeader
        data-testId="epoch.overview.detailHeader"
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
