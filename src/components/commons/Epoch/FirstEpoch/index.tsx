import { Box, Grid } from "@mui/material";
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
} from "./styles";
import ProgressCircle from "../../ProgressCircle";
import { formatDateTimeLocal, getEpochSlotNo } from "../../../../commons/utils/helper";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../../commons/utils/constants";
import { Status } from "../../../../pages/Epoch/styles";
import timeIcon from "../../../../commons/resources/icons/time.svg";
import cubeIcon from "../../../../commons/resources/icons/blockIcon.svg";
import slotIcon from "../../../../commons/resources/icons/slot.svg";
type TProps = {
  data: IDataEpoch;
};
export default function FirstEpoch({ data }: TProps) {
  const progress = data ? ((getEpochSlotNo(data) / MAX_SLOT_EPOCH) * 100).toFixed(0) : 0;
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
