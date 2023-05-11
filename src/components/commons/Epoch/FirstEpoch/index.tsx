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
  TitleCard,
} from "./styles";
import { useScreen } from "../../../../commons/hooks/useScreen";

type TProps = {
  data: IDataEpoch;
};

export default function FirstEpoch({ data }: TProps) {
  const { isTablet } = useScreen();
  const progress = data ? ((getEpochSlotNo(data) / MAX_SLOT_EPOCH) * 100).toFixed(0) : 0;
  const listOverview = [
    {
      icon: ExchangeIcon,
      hideHeader: true,
      title: (
        <EpochNumber>Epoch Number {data?.no}</EpochNumber>
      ),
      value: (
        <Box display={"flex"} alignItems="center">
          <ProgressCircle
            size={60}
            pathLineCap="butt"
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={data?.status?.toLowerCase()}>{EPOCH_STATUS[data?.status]}</Status>
          </ProgressCircle>
        </Box>
      ),
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Block </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {data?.blkCount}
        </Box>
      ),
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
          <Box component={"span"} >
            {getEpochSlotNo(data)}
            /{MAX_SLOT_EPOCH}
          </Box>
        </>
      ),
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> End Time</TitleCard>
        </Box>
      ),
      value: (
        <>
          <Box component={"span"} >
            {formatDateTimeLocal(data?.endTime || "")}
          </Box>
        </>
      ),
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Start Time</TitleCard>
        </Box>
      ),
      value: (
        <>
          <Box component={"span"} >
            {formatDateTimeLocal(data?.startTime || "")}
          </Box>
        </>
      ),
    },
  ];
  if (isTablet) {
    return (
      <DetailHeader
        loading={false}
        listItem={listOverview}
        type="EPOCH"
        title={" "}
      />
    )
  }
  return (
    <EpochCard>
      <EpochNumber>Epoch Number {data?.no}</EpochNumber>
      <Box display="flex" alignItems="center" width="max-content" minWidth="100%">
        <Box mr={20}>
          <ProgressCircle
            size={100}
            pathLineCap="butt"
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={data?.status?.toLowerCase()}>{EPOCH_STATUS[data?.status]}</Status>
          </ProgressCircle>
        </Box>
        <Grid flex={1} container>
          <CardItem item xs={3}>
            <Box display="flex" alignItems="center">
              <img src={cubeIcon} alt="" height={20} />
              <CardItemTitle>Block</CardItemTitle>
            </Box>
            <EpochValue>{data?.blkCount}</EpochValue>
          </CardItem>

          <CardItem item xs={3}>
            <Box display="flex" alignItems="center">
              <img src={slotIcon} alt="" height={20} />
              <CardItemTitle>Slot</CardItemTitle>
            </Box>
            <EpochValue>
              {getEpochSlotNo(data)}
              <MaxSlot>/{MAX_SLOT_EPOCH}</MaxSlot>
            </EpochValue>
          </CardItem>

          <CardItem item xs={3}>
            <Box display="flex" alignItems="center">
              <img src={timeIcon} alt="" height={20} />
              <CardItemTitle>End Time</CardItemTitle>
            </Box>
            <Date>{formatDateTimeLocal(data?.endTime || "").split(" ")[0]}</Date>
            <Time>{formatDateTimeLocal(data?.endTime || "").split(" ")[1]}</Time>
          </CardItem>

          <CardItem item xs={3}>
            <Box display="flex" alignItems="center">
              <img src={timeIcon} alt="" height={20} />
              <CardItemTitle>Start Time</CardItemTitle>
            </Box>
            <Date>{formatDateTimeLocal(data?.startTime || "").split(" ")[0]}</Date>
            <Time>{formatDateTimeLocal(data?.startTime || "").split(" ")[1]}</Time>
          </CardItem>
        </Grid>
      </Box>
    </EpochCard>
  );
}
