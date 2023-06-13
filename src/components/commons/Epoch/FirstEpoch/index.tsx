import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

import { ExchangeIcon, cubeIconUrl, slotIconUrl, timeIconUrl } from "src/commons/resources";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import { Status } from "src/pages/Epoch/styles";

import { Container, EpochNumber, EpochProgress, TitleCard } from "./styles";
import ProgressCircle from "../../ProgressCircle";
import DetailHeader from "../../DetailHeader";

interface IProps {
  data: IDataEpoch;
  onClick: (_: any, r: IDataEpoch, index: number) => void;
}

export default function FirstEpoch({ data: currentEpochData, onClick }: IProps) {
  const theme = useTheme();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  if (!currentEpochData) return null;
  const progress =
    moment(formatDateTimeLocal(currentEpochData.endTime)).diff(moment()) >= 0
      ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
      : 100;
  const listOverview = [
    {
      icon: ExchangeIcon,
      hideHeader: true,
      title: (
        <EpochNumber sx={{ [theme.breakpoints.down("sm")]: { marginTop: "-8px" } }}>
          Epoch Number {currentEpochData?.no}
        </EpochNumber>
      ),
      value: (
        <Box display={"flex"} alignItems="center">
          <ProgressCircle
            size={100}
            pathLineCap="butt"
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={currentEpochData?.status?.toLowerCase()}>{EPOCH_STATUS[currentEpochData?.status]}</Status>
          </ProgressCircle>
        </Box>
      )
    },
    {
      icon: cubeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Block </TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{currentEpochData?.blkCount}</Box>
    },
    {
      icon: slotIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {moment(formatDateTimeLocal(currentEpochData.endTime)).diff(moment()) >= 0
            ? currentEpoch?.slot
            : MAX_SLOT_EPOCH}
          /{MAX_SLOT_EPOCH}
        </Box>
      )
    },
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Start Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpochData?.startTime || "")}</Box>
    },
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> End Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpochData?.endTime || "")}</Box>
    }
  ];
  return (
    <Container onClick={() => onClick(currentEpochData, currentEpochData, -1)}>
      <DetailHeader isHideButtonBack={true} loading={false} listItem={listOverview} type="EPOCH" title={" "} />
    </Container>
  );
}
