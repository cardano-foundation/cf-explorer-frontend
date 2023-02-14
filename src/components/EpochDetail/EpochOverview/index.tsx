import moment from "moment";
import React from "react";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import DetailHeader from "../../commons/DetailHeader";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import outputIcon from "../../../commons/resources/icons/outputIcon.svg";
import cubeIcon from "../../../commons/resources/icons/blockIcon.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import { TitleCard } from "../../BlockDetail/BlockOverview/styles";
import { Box } from "@mui/material";
import { ADAToken } from "../../commons/Token";
import { formatADAFull, formatDateTimeLocal } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
interface EpochOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

const EpochOverview: React.FC<EpochOverviewProps> = ({ data, loading }) => {
  const slot =
    data?.status === "FINISHED"
      ? MAX_SLOT_EPOCH
      : (data?.endTime && data.startTime && moment(data.endTime).diff(data.startTime) / 1000) || 0;
  const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);

  const listOverview = [
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Start time </TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: formatDateTimeLocal(data?.startTime || ""),
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>End time </TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: formatDateTimeLocal(data?.endTime || ""),
    },
    {
      icon: outputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Total Output</TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: (
        <CustomTooltip title={formatADAFull(data?.outSum || 0)}>
          <Box component={"span"}>
            {formatADAFull(data?.outSum || 0)} <ADAToken />
          </Box>
        </CustomTooltip>
      ),
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Block</TitleCard>
        </Box>
      ),
      value: data?.blkCount || 0,
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <>
          {slot}/
          <Box component={"span"} fontWeight="400">
            {MAX_SLOT_EPOCH}
          </Box>
        </>
      ),
    },
  ];
  return (
    <DetailHeader
      loading={loading}
      listItem={listOverview}
      data={
        data && {
          type: "epoch",
          header: {
            title: "Epoch Detail",
            hash: "",
            epochStatus: data.status || "",
          },

          blockDetail: {
            epochNo: data.no,
            epochSlot: slot,
            blockNo: data.blkCount,
          },
          totalOutput: {
            totalOutput: data.outSum || 0,
            token: "ADA",
          },
          progress: {
            progress,
            status: data.status,
          },
        }
      }
    />
  );
};

export default EpochOverview;
