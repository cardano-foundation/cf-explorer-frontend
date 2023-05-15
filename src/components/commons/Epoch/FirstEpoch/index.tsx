import { Box, Grid } from "@mui/material";
import { ExchangeIcon } from "../../../../commons/resources";
import cubeIcon from "../../../../commons/resources/icons/blockIcon.svg";
import slotIcon from "../../../../commons/resources/icons/slot.svg";
import timeIcon from "../../../../commons/resources/icons/time.svg";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../../commons/utils/constants";
import { formatDateTimeLocal, getEpochSlotNo } from "../../../../commons/utils/helper";
import { Status } from "../../../../pages/Epoch/styles";
import DetailHeader from "../../DetailHeader";
import ProgressCircle from "../../ProgressCircle";
import { useScreen } from "../../../../commons/hooks/useScreen";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import {
  CardItem,
  CardItemTitle,
  Date,
  EpochCard,
  EpochNumber,
  EpochProgress,
  EpochValue,
  MaxSlot,
  Time,
  TitleCard
} from "./styles";

export default function FirstEpoch() {
  const { isTablet } = useScreen();
  const { data } = useFetchList<IDataEpoch>(API.EPOCH.LIST, { size: 1 });
  const currentEpoch = data[0];
  if (!currentEpoch) return null;
  const progress = ((getEpochSlotNo(currentEpoch) / MAX_SLOT_EPOCH) * 100).toFixed(0);
  const listOverview = [
    {
      icon: ExchangeIcon,
      hideHeader: true,
      title: <EpochNumber>Epoch Number {currentEpoch?.no}</EpochNumber>,
      value: (
        <Box display={"flex"} alignItems='center'>
          <ProgressCircle
            size={60}
            pathLineCap='butt'
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={currentEpoch?.status?.toLowerCase()}>{EPOCH_STATUS[currentEpoch?.status]}</Status>
          </ProgressCircle>
        </Box>
      )
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}>Block </TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{currentEpoch?.blkCount}</Box>
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {getEpochSlotNo(currentEpoch)}/{MAX_SLOT_EPOCH}
        </Box>
      )
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> End Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpoch?.endTime || "")}</Box>
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> Start Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpoch?.startTime || "")}</Box>
    }
  ];
  if (isTablet) {
    return <DetailHeader loading={false} listItem={listOverview} type='EPOCH' title={" "} />;
  }
  return (
    <EpochCard>
      <EpochNumber>Epoch Number {currentEpoch.no}</EpochNumber>
      <Box display='flex' alignItems='center' width='max-content' minWidth='100%'>
        <Box mr={20}>
          <ProgressCircle
            size={100}
            pathLineCap='butt'
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={currentEpoch.status?.toLowerCase()}>{EPOCH_STATUS[currentEpoch.status]}</Status>
          </ProgressCircle>
        </Box>
        <Grid flex={1} container>
          <CardItem item xs={3}>
            <Box display='flex' alignItems='center'>
              <img src={cubeIcon} alt='' height={20} />
              <CardItemTitle>Block</CardItemTitle>
            </Box>
            <EpochValue>{currentEpoch.blkCount}</EpochValue>
          </CardItem>

          <CardItem item xs={3}>
            <Box display='flex' alignItems='center'>
              <img src={slotIcon} alt='' height={20} />
              <CardItemTitle>Slot</CardItemTitle>
            </Box>
            <EpochValue>
              {getEpochSlotNo(currentEpoch)}
              <MaxSlot>/{MAX_SLOT_EPOCH}</MaxSlot>
            </EpochValue>
          </CardItem>

          <CardItem item xs={3}>
            <Box display='flex' alignItems='center'>
              <img src={timeIcon} alt='' height={20} />
              <CardItemTitle>End Time</CardItemTitle>
            </Box>
            <Date>{formatDateTimeLocal(currentEpoch.endTime || "").split(" ")[0]}</Date>
            <Time>{formatDateTimeLocal(currentEpoch.endTime || "").split(" ")[1]}</Time>
          </CardItem>

          <CardItem item xs={3}>
            <Box display='flex' alignItems='center'>
              <img src={timeIcon} alt='' height={20} />
              <CardItemTitle>Start Time</CardItemTitle>
            </Box>
            <Date>{formatDateTimeLocal(currentEpoch.startTime || "").split(" ")[0]}</Date>
            <Time>{formatDateTimeLocal(currentEpoch.startTime || "").split(" ")[1]}</Time>
          </CardItem>
        </Grid>
      </Box>
    </EpochCard>
  );
}
