import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

import { timeIconUrl, outputIconUrl, cubeIconUrl, slotIconUrl } from "src/commons/resources";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import DetailHeader from "src/components/commons/DetailHeader";
import { TitleCard } from "src/components/BlockDetail/BlockOverview/styles";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";

interface EpochOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
  lastUpdated: number;
}

const EpochOverview: React.FC<EpochOverviewProps> = ({ data, loading, lastUpdated }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const slot = data && data?.no === currentEpoch?.no ? currentEpoch.slot : MAX_SLOT_EPOCH;

  const listOverview = [
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Start time </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.startTime || "")
    },
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>End time </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.endTime || "")
    },
    {
      icon: outputIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Total Output</TitleCard>
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
          <TitleCard mr={1}> Block</TitleCard>
        </Box>
      ),
      value: data?.blkCount || 0
    },
    {
      icon: slotIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <>
          {moment(formatDateTimeLocal(data?.endTime || "")).diff(moment()) > 0 ? slot : MAX_SLOT_EPOCH}/
          <Box component={"span"} fontWeight="400">
            {MAX_SLOT_EPOCH}
          </Box>
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
        bookmarkData={`${data?.no || ""}`}
        title={"Epoch detail"}
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
